import { CreatedHotelResponse } from '@akkor-hotel/shared/api-interfaces';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'akkor-hotel-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {



  @Input() hotels$?: Observable<CreatedHotelResponse[]>;

}
