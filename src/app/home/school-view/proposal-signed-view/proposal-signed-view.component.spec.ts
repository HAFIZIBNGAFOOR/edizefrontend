import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalSignedViewComponent } from './proposal-signed-view.component';

describe('ProposalSignedViewComponent', () => {
  let component: ProposalSignedViewComponent;
  let fixture: ComponentFixture<ProposalSignedViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProposalSignedViewComponent]
    });
    fixture = TestBed.createComponent(ProposalSignedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
