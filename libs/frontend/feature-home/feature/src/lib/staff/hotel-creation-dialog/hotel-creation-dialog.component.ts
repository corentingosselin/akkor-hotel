/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HotelFacade } from '@akkor-hotel/frontend/feature-home/data-access';
import { CreatedHotelResponse } from '@akkor-hotel/shared/api-interfaces';
import { LoadingErrorService } from '@akkor-hotel/shared/frontend';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { tap } from 'rxjs';


@Component({
  selector: 'akkor-hotel-hotel-creation-dialog',
  templateUrl: './hotel-creation-dialog.component.html',
  styleUrls: ['./hotel-creation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'The value is required',
        pattern: 'Enter a valid url',
      },
    },
  ],
})
export class HotelCreationDialogComponent {
  constructor(
    private readonly loadingErrorService: LoadingErrorService,
    private hotelFacade: HotelFacade,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<CreatedHotelResponse, CreatedHotelResponse>,

  ) {}

  readonly error$ = this.loadingErrorService.errorStatus$;
  readonly loading$ = this.loadingErrorService.loadingStatus$;

  readonly form = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    descriptionControl: new FormControl('', [Validators.required]),
    cityControl: new FormControl('', [Validators.required]),
    countryControl: new FormControl('', [Validators.required]),
    addressControl: new FormControl('', [Validators.required]),
    pictureControl: new FormControl('', [
      Validators.required,
      Validators.pattern('https?://.+'),
    ]),
  });
  createHotel() {
    if (this.form.invalid) return;
    this.hotelFacade.createHotel({
      name: this.form.controls.nameControl.value!,
      description: this.form.controls.descriptionControl.value!,
      city: this.form.controls.cityControl.value!,
      country: this.form.controls.countryControl.value!,
      address: this.form.controls.addressControl.value!,
      picture: this.form.controls.pictureControl.value!,
    }).pipe(
      tap((hotel) => {
        this.context.completeWith(hotel);
      }
    )).subscribe();
  }
}
