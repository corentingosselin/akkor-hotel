import { CreatedHotelResponse } from '@akkor-hotel/shared/api-interfaces';
import { LoadingErrorService } from '@akkor-hotel/shared/frontend';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'akkor-hotel-list-hotels',
  templateUrl: './list-hotels.component.html',
  styleUrls: ['./list-hotels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListHotelsComponent {
  constructor(private readonly loadingErrorService: LoadingErrorService) {}

  readonly loading$ = this.loadingErrorService.loadingStatus$;

  @Input() hotels$?: Observable<CreatedHotelResponse[]>;
}
