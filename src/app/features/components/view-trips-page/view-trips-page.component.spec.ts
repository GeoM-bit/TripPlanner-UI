import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTripsPageComponent } from './view-trips-page.component';

describe('ViewTripsPageComponent', () => {
  let component: ViewTripsPageComponent;
  let fixture: ComponentFixture<ViewTripsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTripsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTripsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
