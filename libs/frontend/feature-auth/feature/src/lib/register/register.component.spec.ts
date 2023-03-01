import { AuthFacade } from '@akkor-hotel/frontend/feature-auth/data-access';
import { LoadingErrorService } from '@akkor-hotel/shared/frontend';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiErrorModule, TuiLoaderModule } from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { of } from 'rxjs';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authFacade: AuthFacade;
  let loadingErrorService: LoadingErrorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiLoaderModule,
        HttpClientModule,
      ],
      declarations: [RegisterComponent],
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
        {
          provide: AuthFacade,
          useValue: {
            register: jest.fn(),
          },
        },
        {
          provide: LoadingErrorService,
          useValue: {
            errorStatus$: of(null),
            loadingStatus$: of(false),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authFacade = TestBed.inject(AuthFacade);
    loadingErrorService = TestBed.inject(LoadingErrorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form', () => {
    let form: FormGroup;
    beforeEach(() => {
      form = component.form;
    });

    it('should be invalid by default', () => {
      expect(form.valid).toBeFalsy();
    });

    it('should be valid when all fields are filled with correct values', () => {
      form.patchValue({
        emailControl: 'test@test.com',
        passwordControl: 'Test123!',
        confirmPasswordControl: 'Test123!',
        lastNameControl: 'Doe',
        firstNameControl: 'John',
        pseudoControl: 'johndoe',
      });
      expect(form.valid).toBeTruthy();
    });

    it('should be invalid when email field is empty', () => {
      form.patchValue({
        emailControl: '',
        passwordControl: 'Test123!',
        confirmPasswordControl: 'Test123!',
        lastNameControl: 'Doe',
        firstNameControl: 'John',
        pseudoControl: 'johndoe',
      });
      expect(form.valid).toBeFalsy();
    });

    it('should be invalid when password field is empty', () => {
      form.patchValue({
        emailControl: 'test@test.com',
        passwordControl: '',
        confirmPasswordControl: 'Test123!',
        lastNameControl: 'Doe',
        firstNameControl: 'John',
        pseudoControl: 'johndoe',
      });
      expect(form.valid).toBeFalsy();
    });

    it('should be invalid when confirm password field is empty', () => {
      form.patchValue({
        emailControl: 'test@test.com',
        passwordControl: 'Test123!',
        confirmPasswordControl: '',
        lastNameControl: 'Doe',
        firstNameControl: 'John',
        pseudoControl: 'johndoe',
      });
      expect(form.valid).toBeFalsy();
    });

    it('should be invalid when last name field is empty', () => {
      form.patchValue({
        emailControl: 'test@test.com',
        passwordControl: 'Test123!',
        confirmPasswordControl: 'Test123!',
        lastNameControl: '',
        firstNameControl: 'John',
        pseudoControl: 'johndoe',
      });
      expect(form.valid).toBeFalsy();
    });

    it('should be invalid when first name field is empty', () => {
      form.patchValue({
        emailControl: 'test@test.com',
        passwordControl: 'Test123!',
        confirmPasswordControl: 'Test123!',
        lastNameControl: 'Doe',
        firstNameControl: '',
        pseudoControl: 'johndoe',
      });
      expect(form.valid).toBeFalsy();
    });

    it('should be invalid when pseudo field is empty', () => {
      form.patchValue({
        emailControl: 'test@test.com',
        passwordControl: 'Test123!',
        confirmPasswordControl: 'Test123!',
        lastNameControl: 'Doe',
        firstNameControl: 'John',
        pseudoControl: '',
      });
      expect(form.valid).toBeFalsy();
    });

    it('should be invalid when email field is invalid', () => {
      form.patchValue({
        emailControl: 'test',
        passwordControl: 'Test123!',
        confirmPasswordControl: 'Test123!',
        lastNameControl: 'Doe',
        firstNameControl: 'John',
        pseudoControl: 'johndoe',
      });
      expect(form.valid).toBeFalsy();
    });

    it('should be invalid when password field is not secure', () => {
      form.patchValue({
        emailControl: 'test@test.com',
        passwordControl: 'test1234',
        confirmPasswordControl: 'test1234',
        lastNameControl: 'Doe',
        firstNameControl: 'John',
        pseudoControl: 'johndoe',
      });
      expect(form.valid).toBeFalsy();
    });

    it('should be invalid when passwords do not match', () => {
      form.patchValue({
        emailControl: 'test@test.com',
        passwordControl: 'Test123!',
        confirmPasswordControl: 'Test1234!',
        lastNameControl: 'Doe',
        firstNameControl: 'John',
        pseudoControl: 'johndoe',
      });
      expect(form.valid).toBeFalsy();
    });
  
  });
});
