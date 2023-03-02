import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('hotels$', () => {

    it('should not display hotel list when hotels$ is not provided', () => {
      component.hotels$ = undefined;
      fixture.detectChanges();

      const hotelElements = fixture.nativeElement.querySelectorAll('.hotel');
      expect(hotelElements.length).toBe(0);
    });
  });
});
