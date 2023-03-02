import { AuthFacade } from '@akkor-hotel/frontend/feature-auth/data-access';
import { LoadingErrorService } from '@akkor-hotel/shared/frontend';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiErrorModule, TuiLoaderModule } from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';

describe('RegisterComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
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
      declarations: [LoginComponent],
      providers: [
        {
          provide: TUI_VALIDATION_ERRORS,
          useValue: {
            required: 'The value is required',
            email: 'Enter a valid email',
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
    fixture = TestBed.createComponent(LoginComponent);
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
      });
      expect(form.valid).toBeTruthy();
    });

    it('should be invalid when email field is empty', () => {
      form.patchValue({
        emailControl: '',
        passwordControl: 'Test123!',
      });
      expect(form.valid).toBeFalsy();
    });

    it('should be invalid when password field is empty', () => {
      form.patchValue({
        emailControl: 'test@test.com',
        passwordControl: '',
      });
      expect(form.valid).toBeFalsy();
    });


    it('should be invalid when email field is invalid', () => {
      form.patchValue({
        emailControl: 'test',
        passwordControl: 'Test123!',
      });
      expect(form.valid).toBeFalsy();
    });

    
  
  });
});
