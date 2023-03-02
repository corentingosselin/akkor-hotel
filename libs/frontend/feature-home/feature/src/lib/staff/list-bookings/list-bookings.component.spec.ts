import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListBookingsComponent } from './list-bookings.component';
import { HotelFacade } from '@akkor-hotel/frontend/feature-home/data-access';
import { LoadingErrorService } from '@akkor-hotel/shared/frontend';
import { of } from 'rxjs';
import { BookingResponse, Hotel } from '@akkor-hotel/shared/api-interfaces';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';

describe('ListBookingsComponent', () => {
  let component: ListBookingsComponent;
  let fixture: ComponentFixture<ListBookingsComponent>;
  let hotelFacadeMock: any;
  const hotel: Hotel = {
    id: 123,
    name: 'Test Hotel',
    address: '123 Test St.',
    city: 'Test City',
    country: 'Test Country',
    description: 'Test Description',
    picture: 'Test Picture',
  };

  beforeEach(async () => {
    hotelFacadeMock = {
      getBookings: jest.fn().mockReturnValue(
        of([
          {
            id: 1,
            hotel: {
              id: 123,
              name: 'Test Hotel',
              address: '123 Test St.',
              city: 'Test City',
              country: 'Test Country',
              description: 'Test Description',
              picture: 'Test Picture'
            },
            user: {
              id: 1,
              firstName: 'John',
              lastName: 'Doe',
              email: 'johndoe@test.com',
              created_at: new Date(),
              updated_at: new Date(),
          
            },
            startDate: new Date('2022-01-01'),
            endDate: new Date('2022-01-07'),
            created_at: new Date(),
            updated_at: new Date(),
          },
        ] as BookingResponse[])
      ),
    };

    await TestBed.configureTestingModule({
      declarations: [ListBookingsComponent],
      providers: [
        {
          provide: HotelFacade,
          useValue: hotelFacadeMock,
        },
        LoadingErrorService,
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {
            data: hotel,
          } as TuiDialogContext<Hotel, Hotel>,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display booking data from service', () => {
    expect(component.data).toEqual([
      {
        hotel: 'Test Hotel',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@test.com',
        startDate: new Date('2022-01-01'),
        endDate: new Date('2022-01-07'),
      },
    ]);
    expect(fixture.nativeElement.querySelector('table')).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('tr').length).toEqual(2); // 1 for the header row and 1 for the data row
  });
});