import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotLeadComponent } from './hot-lead.component';

describe('HotLeadComponent', () => {
  let component: HotLeadComponent;
  let fixture: ComponentFixture<HotLeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotLeadComponent]
    });
    fixture = TestBed.createComponent(HotLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
