import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolViewComponent } from './school-view.component';

describe('SchoolViewComponent', () => {
  let component: SchoolViewComponent;
  let fixture: ComponentFixture<SchoolViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolViewComponent]
    });
    fixture = TestBed.createComponent(SchoolViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
