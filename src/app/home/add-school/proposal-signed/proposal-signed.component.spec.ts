import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalSignedComponent } from './proposal-signed.component';

describe('ProposalSignedComponent', () => {
  let component: ProposalSignedComponent;
  let fixture: ComponentFixture<ProposalSignedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProposalSignedComponent]
    });
    fixture = TestBed.createComponent(ProposalSignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
