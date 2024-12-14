import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotLeadViewComponent } from './hot-lead-view.component';

describe('HotLeadViewComponent', () => {
  let component: HotLeadViewComponent;
  let fixture: ComponentFixture<HotLeadViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotLeadViewComponent]
    });
    fixture = TestBed.createComponent(HotLeadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
