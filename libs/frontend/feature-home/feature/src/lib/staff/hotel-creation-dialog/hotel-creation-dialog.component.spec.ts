import { HotelFacade } from '@akkor-hotel/frontend/feature-home/data-access';
import { LoadingErrorService } from '@akkor-hotel/shared/frontend';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  TuiButtonModule,
  TuiDialogModule,
  TuiErrorModule,
  TuiLoaderModule,
  TuiNotificationModule,
} from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputModule, TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { of } from 'rxjs';

import { HotelCreationDialogComponent } from './hotel-creation-dialog.component';

describe('HotelCreationDialogComponent', () => {
  let component: HotelCreationDialogComponent;
  let fixture: ComponentFixture<HotelCreationDialogComponent>;
  let hotelFacade: HotelFacade;
  let loadingErrorService: LoadingErrorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TuiInputModule,
        TuiNotificationModule,
        TuiDialogModule,  
        TuiFieldErrorPipeModule,
        TuiErrorModule,
        TuiButtonModule,
        TuiLoaderModule,
        HttpClientModule,
      ],
      declarations: [HotelCreationDialogComponent],
      providers: [
        {
          provide: TUI_VALIDATION_ERRORS,
          useValue: {
            required: 'The value is required',
            pattern: 'Enter a valid url',
          },
        },

        {
          provide: HotelFacade,
          useValue: {
            createHotel: jest.fn(),
          },
        },
        {
          provide: LoadingErrorService,
          useValue: {
            errorStatus$: of(null),
            loadingStatus$: of(false),
          },
        },
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelCreationDialogComponent);
    component = fixture.componentInstance;
    hotelFacade = TestBed.inject(HotelFacade);
    loadingErrorService = TestBed.inject(LoadingErrorService);
    fixture.detectChanges();
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
        nameControl: 'Test Hotel',
        descriptionControl: 'This is a test hotel',
        cityControl: 'Test City',
        countryControl: 'Test Country',
        addressControl: 'Test Address',
        pictureControl: 'https://test-image.com/image.jpg',
      });
      expect(form.valid).toBeTruthy();
    });

    it('should be invalid when name field is empty', () => {
      form.patchValue({
        nameControl: '',
        descriptionControl: 'This is a test hotel',
        cityControl: 'Test City',
        countryControl: 'Test Country',
        addressControl: 'Test Address',
        pictureControl: 'https://test-image.com/image.jpg',
      });
      expect(form.valid).toBeFalsy();
    });

    it('should be invalid when description field is empty', () => {
      form.patchValue({
        nameControl: 'Test Hotel',
        descriptionControl: '',
        cityControl: 'Test City',
        countryControl: 'Test Country',
        addressControl: 'Test Address',
        pictureControl: 'https://test-image.com/image.jpg',
      });
      expect(form.valid).toBeFalsy();
    });

    it('should be invalid when city field is empty', () => {
      form.patchValue({
        nameControl: 'Test Hotel',
        descriptionControl: 'This is a test hotel',
        cityControl: '',
        countryControl: 'Test Country',
        addressControl: 'Test Address',
        pictureControl: 'https://test-image.com/image.jpg',
      });
      expect(form.valid).toBeFalsy();
    });

    it('should be invalid when country field is empty', () => {
      form.patchValue({
        nameControl: 'Test Hotel',
        descriptionControl: 'This is a test hotel',
        cityControl: 'Test City',
        countryControl: '',
        addressControl: 'Test Address',
        pictureControl: 'https://test-image.com/image.jpg',
      });
      expect(form.valid).toBeFalsy();
    });

    it('should be invalid when address field is empty', () => {
      form.patchValue({
        nameControl: 'Test Hotel',
        descriptionControl: 'This is a test hotel',
        cityControl: 'Test City',
        countryControl: 'Test Country',
        addressControl: '',
        pictureControl: 'https://test-image.com/image.jpg',
      });
      expect(form.valid).toBeFalsy();
    });

    it('should be invalid when picture field is empty', () => {
      form.patchValue({
        nameControl: 'Test Hotel',
        descriptionControl: 'This is a test hotel',
        cityControl: 'Test City',
        countryControl: 'Test Country',
        addressControl: 'Test Address',
        pictureControl: '',
      });
      expect(form.valid).toBeFalsy();
    });

    it('should be invalid when picture field is not a valid URL', () => {
      form.patchValue({
        nameControl: 'Test Hotel',
        descriptionControl: 'This is a test hotel',
        cityControl: 'Test City',
        countryControl: 'Test Country',
        addressControl: 'Test Address',
        pictureControl: 'not_a_url',
      });
      expect(form.valid).toBeFalsy();
    });
  });

  describe('createHotel', () => {
    it('should not call hotelFacade.createHotel when the form is invalid', () => {
      jest.spyOn(hotelFacade, 'createHotel');
      component.createHotel();
      expect(hotelFacade.createHotel).not.toHaveBeenCalled();
    });
  });
});
