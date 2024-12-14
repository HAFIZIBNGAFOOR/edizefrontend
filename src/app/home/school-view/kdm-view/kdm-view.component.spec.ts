import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KdmViewComponent } from './kdm-view.component';

describe('KdmViewComponent', () => {
  let component: KdmViewComponent;
  let fixture: ComponentFixture<KdmViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KdmViewComponent]
    });
    fixture = TestBed.createComponent(KdmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
