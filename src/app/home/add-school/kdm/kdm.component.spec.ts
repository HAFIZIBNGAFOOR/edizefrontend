import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KDMComponent } from './kdm.component';

describe('KDMComponent', () => {
  let component: KDMComponent;
  let fixture: ComponentFixture<KDMComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KDMComponent]
    });
    fixture = TestBed.createComponent(KDMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
