import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GolpesComponent } from './golpes.component';

describe('GolpesComponent', () => {
  let component: GolpesComponent;
  let fixture: ComponentFixture<GolpesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GolpesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GolpesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
