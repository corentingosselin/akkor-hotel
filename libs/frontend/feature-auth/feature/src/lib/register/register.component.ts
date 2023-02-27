import { AuthFacade } from '@akkor-hotel/frontend/feature-auth/data-access';
import { RegisterUserDto } from '@akkor-hotel/shared/api-interfaces';
import { LoadingErrorService } from '@akkor-hotel/shared/frontend';
import { isPasswordSecure } from '@akkor-hotel/shared/utils';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

@Component({
  selector: 'akkor-hotel-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'The value is required',
        email: 'Enter a valid email',
        invalidPassword:
          'Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character',
        matching: 'Passwords do not match',
      },
    },
  ],
})
export class RegisterComponent {
  constructor(
    private readonly authFacade: AuthFacade,
    private readonly loadingErrorService: LoadingErrorService
  ) {}

  readonly error$ = this.loadingErrorService.errorStatus$;
  readonly loading$ = this.loadingErrorService.loadingStatus$;

  readonly form = new FormGroup(
    {
      emailControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      passwordControl: new FormControl('', [
        Validators.required,
        passwordValidator(),
        matchValidator('confirmPasswordControl', true)
      ]),
      confirmPasswordControl: new FormControl('', [Validators.required,  matchValidator('passwordControl')]),
      lastNameControl: new FormControl('', [Validators.required]),
      firstNameControl: new FormControl('', [Validators.required]),
      pseudoControl: new FormControl('', [Validators.required]),
    }
  );
  register() {
    console.log(this.form.errors);
    if (this.form.invalid) return;
    const {
      emailControl,
      passwordControl,
      confirmPasswordControl,
      lastNameControl,
      firstNameControl,
      pseudoControl,
    } = this.form.value;

    this.authFacade.register({
      email: emailControl,
      password: passwordControl,
      confirmPassword: confirmPasswordControl,
      lastName: lastNameControl,
      firstName: firstNameControl,
      pseudo: pseudoControl,
    } as RegisterUserDto);
  }
}

function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.value;
    if (!password) {
      return null;
    }

    return isPasswordSecure(password) ? null : { invalidPassword: true };
  };
}

export function matchValidator(
  matchTo: string, 
  reverse?: boolean
): ValidatorFn {
  return (control: AbstractControl): 
  ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent &&
      !!control.parent.value &&
      control.value === 
      (control.parent?.controls as any)[matchTo].value
      ? null
      : { matching: true };
  };
}
