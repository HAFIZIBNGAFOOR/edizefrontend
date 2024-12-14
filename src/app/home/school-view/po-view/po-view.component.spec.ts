import { ComponentFixture, TestBed } from '@angular/core/testing';

import { POViewComponent } from './po-view.component';

describe('POViewComponent', () => {
  let component: POViewComponent;
  let fixture: ComponentFixture<POViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [POViewComponent]
    });
    fixture = TestBed.createComponent(POViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
