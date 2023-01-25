import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTripsFormComponent } from './register-trips-form.component';

describe('RegisterTripsFormComponent', () => {
  let component: RegisterTripsFormComponent;
  let fixture: ComponentFixture<RegisterTripsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterTripsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterTripsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
