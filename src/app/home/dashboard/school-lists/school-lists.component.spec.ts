import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolListsComponent } from './school-lists.component';

describe('SchoolListsComponent', () => {
  let component: SchoolListsComponent;
  let fixture: ComponentFixture<SchoolListsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolListsComponent]
    });
    fixture = TestBed.createComponent(SchoolListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
