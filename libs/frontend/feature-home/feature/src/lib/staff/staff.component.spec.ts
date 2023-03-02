import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaffComponent } from './staff.component';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, of } from 'rxjs';
import { CreatedHotelResponse } from '@akkor-hotel/shared/api-interfaces';
import { HotelCreationDialogComponent } from './hotel-creation-dialog/hotel-creation-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('StaffComponent', () => {
  let component: StaffComponent;
  let fixture: ComponentFixture<StaffComponent>;
  let dialogServiceMock: any;

  beforeEach(async () => {
    dialogServiceMock = {
      open: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [StaffComponent],
      providers: [
        {
          provide: TuiDialogService,
          useValue: dialogServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog and add new hotel', () => {
    const newHotel = {
      id: 123,
      name: 'Test Hotel',
      address: '123 Test St.',
      city: 'Test City',
      country: 'Test Country',
      description: 'Test Description',
      picture: 'Test Picture',
      created_at: new Date(),
      updated_at: new Date(),
    } as CreatedHotelResponse;
    dialogServiceMock.open.mockReturnValue(
      of(newHotel as CreatedHotelResponse)
    );

    component.onDialogOpen();

    expect(dialogServiceMock.open).toHaveBeenCalledWith(
      expect.any(PolymorpheusComponent)
    );

    component._hotels$.subscribe((hotels) => {
      expect(hotels).toEqual([newHotel]);
    });

  });
});
