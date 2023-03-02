import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListHotelsComponent } from './list-hotels.component';
import { LoadingErrorService } from '@akkor-hotel/shared/frontend';
import { Observable, of } from 'rxjs';
import { CreatedHotelResponse } from '@akkor-hotel/shared/api-interfaces';

describe('ListHotelsComponent', () => {
  let component: ListHotelsComponent;
  let fixture: ComponentFixture<ListHotelsComponent>;
  let loadingErrorServiceMock: { loadingStatus$: Observable<boolean> };

  beforeEach(async () => {
    loadingErrorServiceMock = {
      loadingStatus$: of(true),
    };

    await TestBed.configureTestingModule({
      declarations: [ListHotelsComponent],
      providers: [
        {
          provide: LoadingErrorService,
          useValue: loadingErrorServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHotelsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hotels', () => {
    const hotels = [
      {
        id: 1,
        name: 'test',
        city: 'test',
        address: 'test',
        country: 'test',
        description: 'test',
        picture: 'test',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'test',
        city: 'test',
        address: 'test',
        country: 'test',
        description: 'test',
        picture: 'test',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ] as CreatedHotelResponse[];
    component.hotels$ = of(hotels);
    fixture.detectChanges();
    const hotelCards = fixture.nativeElement.querySelectorAll(
      'akkor-hotel-hotel-card'
    );
    expect(hotelCards.length).toBe(2);
  });


});
