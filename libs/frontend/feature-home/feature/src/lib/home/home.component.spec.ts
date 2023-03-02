import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AuthFacade } from '@akkor-hotel/frontend/feature-auth/data-access';
import { HotelFacade } from '@akkor-hotel/frontend/feature-home/data-access';
import { UserRole } from '@akkor-hotel/shared/api-interfaces';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authFacade: AuthFacade;
  let hotelFacade: HotelFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: AuthFacade,
          useValue: {
            isLoggedIn$: of({
              user: {
                email: 'test@test.com',
                pseudo: 'testPseudo',
                role: UserRole.USER,
              },
            }),
          },
        },
        {
          provide: HotelFacade,
          useValue: { fetchHotels: jest.fn() },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authFacade = TestBed.inject(AuthFacade);
    hotelFacade = TestBed.inject(HotelFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render akkor-hotel-user component when user is logged in as a user', () => {
    const element = fixture.nativeElement;
    expect(element.querySelector('akkor-hotel-user')).toBeTruthy();
    expect(element.querySelector('akkor-hotel-staff')).toBeFalsy();
  });

});
