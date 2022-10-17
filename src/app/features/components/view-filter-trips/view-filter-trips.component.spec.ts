import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFilterTripsComponent } from './view-filter-trips.component';

describe('ViewFilterTripsComponent', () => {
  let component: ViewFilterTripsComponent;
  let fixture: ComponentFixture<ViewFilterTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFilterTripsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFilterTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
