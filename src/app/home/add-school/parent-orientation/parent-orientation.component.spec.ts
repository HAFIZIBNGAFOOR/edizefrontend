import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentOrientationComponent } from './parent-orientation.component';

describe('ParentOrientationComponent', () => {
  let component: ParentOrientationComponent;
  let fixture: ComponentFixture<ParentOrientationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentOrientationComponent]
    });
    fixture = TestBed.createComponent(ParentOrientationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
