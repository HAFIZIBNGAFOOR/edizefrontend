import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractSignedViewComponent } from './contract-signed-view.component';

describe('ContractSignedViewComponent', () => {
  let component: ContractSignedViewComponent;
  let fixture: ComponentFixture<ContractSignedViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractSignedViewComponent]
    });
    fixture = TestBed.createComponent(ContractSignedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
