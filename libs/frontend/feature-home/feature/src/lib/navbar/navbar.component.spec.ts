import { AuthFacade } from '@akkor-hotel/frontend/feature-auth/data-access';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TuiDropdownHostModule } from '@taiga-ui/cdk';
import { TuiDialogService, TuiHostedDropdownModule } from '@taiga-ui/core';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let dialogServiceMock: any;
  let authFacadeMock: any;

  beforeEach(async () => {
    dialogServiceMock = {
      open: jest.fn(),
    };
    authFacadeMock = {
      logout: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule, TuiDropdownHostModule, TuiHostedDropdownModule],
      providers: [
        {
          provide: TuiDialogService,
          useValue: dialogServiceMock,
        },
        {
          provide: AuthFacade,
          useValue: authFacadeMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    component.logout();
    expect(authFacadeMock.logout).toHaveBeenCalled();
  });
});