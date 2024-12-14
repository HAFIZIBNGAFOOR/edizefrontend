import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDemoViewComponent } from './product-demo-view.component';

describe('ProductDemoViewComponent', () => {
  let component: ProductDemoViewComponent;
  let fixture: ComponentFixture<ProductDemoViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDemoViewComponent]
    });
    fixture = TestBed.createComponent(ProductDemoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
