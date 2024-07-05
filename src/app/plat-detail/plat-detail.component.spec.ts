import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatDetailComponent } from './plat-detail.component';

describe('PlatDetailComponent', () => {
  let component: PlatDetailComponent;
  let fixture: ComponentFixture<PlatDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
