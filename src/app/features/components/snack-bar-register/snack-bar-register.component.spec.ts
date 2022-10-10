import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarRegisterComponent } from './snack-bar-register.component';

describe('SnackBarRegisterComponent', () => {
  let component: SnackBarRegisterComponent;
  let fixture: ComponentFixture<SnackBarRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackBarRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackBarRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
