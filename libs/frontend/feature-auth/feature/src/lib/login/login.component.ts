/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AuthFacade } from '@akkor-hotel/frontend/feature-auth/data-access';
import { LoadingErrorService } from '@akkor-hotel/shared/frontend';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

@Component({
  selector: 'akkor-hotel-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'The value is required',
        email: 'Enter a valid email',
      },
    },
  ],
})
export class LoginComponent {
  constructor(
    private readonly authFacade: AuthFacade,
    private readonly loadingErrorService: LoadingErrorService
  ) {}

  readonly error$ = this.loadingErrorService.errorStatus$;
  readonly loading$ = this.loadingErrorService.loadingStatus$;

  readonly form = new FormGroup({
    emailControl: new FormControl('', [Validators.required, Validators.email]),
    passwordControl: new FormControl('', [Validators.required]),
  });
  login() {
    if (!this.form.valid) return;
    this.authFacade.login({
      username: this.form.controls.emailControl.value!,
      password: this.form.controls.passwordControl.value!,
    });
  }
}
