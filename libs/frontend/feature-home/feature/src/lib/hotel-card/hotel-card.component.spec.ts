import { AuthFacade } from '@akkor-hotel/frontend/feature-auth/data-access';
import { HotelFacade } from '@akkor-hotel/frontend/feature-home/data-access';
import { UserRole } from '@akkor-hotel/shared/api-interfaces';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiAlertService,
  TuiButtonModule,
  TuiDialogService, TuiRootModule
} from '@taiga-ui/core';
import { TuiInputDateRangeModule, TuiInputModule } from '@taiga-ui/kit';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, of } from 'rxjs';
import { ListBookingsComponent } from '../staff/list-bookings/list-bookings.component';
import { HotelCardComponent } from './hotel-card.component';

describe('HotelCardComponent', () => {
  let component: HotelCardComponent;
  let fixture: ComponentFixture<HotelCardComponent>;
  let authFacade: AuthFacade;
  let hotelFacade: HotelFacade;
  let alertService: TuiAlertService;
  let dialogService: TuiDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TuiInputModule,
        TuiInputDateRangeModule,
        TuiButtonModule,
        TuiRootModule,
        PolymorpheusModule,
      ],
      declarations: [HotelCardComponent, ListBookingsComponent],
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
          useValue: {
            createBooking: jest.fn(),
          },
        },
        TuiAlertService,
        TuiDialogService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelCardComponent);
    component = fixture.componentInstance;
    authFacade = TestBed.inject(AuthFacade);
    hotelFacade = TestBed.inject(HotelFacade);
    alertService = TestBed.inject(TuiAlertService);
    dialogService = TestBed.inject(TuiDialogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
