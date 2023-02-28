import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelCreationDialogComponent } from './hotel-creation-dialog.component';

describe('HotelCreationDialogComponent', () => {
  let component: HotelCreationDialogComponent;
  let fixture: ComponentFixture<HotelCreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelCreationDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HotelCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
