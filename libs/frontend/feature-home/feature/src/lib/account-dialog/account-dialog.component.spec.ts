import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountDialogComponent } from './account-dialog.component';
import { AuthFacade } from '@akkor-hotel/frontend/feature-auth/data-access';
import { of } from 'rxjs';
import { TuiLabelModule } from '@taiga-ui/core';

describe('AccountDialogComponent', () => {
  let component: AccountDialogComponent;
  let fixture: ComponentFixture<AccountDialogComponent>;
  let authFacade: AuthFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountDialogComponent],
      imports: [
        TuiLabelModule

      ],
      providers: [
        {
          provide: AuthFacade,
          useValue: {
            isLoggedIn$: of({
              user: {
                email: 'test@test.com',
                pseudo: 'testPseudo',
                role: 'testRole',
                lastName: 'testLastName',
                firstName: 'testFirstName',
              },
            }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDialogComponent);
    component = fixture.componentInstance;
    authFacade = TestBed.inject(AuthFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the user details when logged in', () => {
    const element = fixture.nativeElement;
    expect(element.querySelector('h1').textContent).toContain('My account');
    expect(element.querySelector('[tuiLabel="email"]').textContent).toContain(
      'test@test.com'
    );
    expect(element.querySelector('[tuiLabel="pseudo"]').textContent).toContain(
      'testPseudo'
    );
    expect(element.querySelector('[tuiLabel="role"]').textContent).toContain(
      'testRole'
    );
    expect(
      element.querySelector('[tuiLabel="last name"]').textContent
    ).toContain('testLastName');
    expect(
      element.querySelector('[tuiLabel="first name"]').textContent
    ).toContain('testFirstName');
  });
});
