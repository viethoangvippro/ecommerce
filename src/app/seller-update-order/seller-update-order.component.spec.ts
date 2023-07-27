import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUpdateOrderComponent } from './seller-update-order.component';

describe('SellerUpdateOrderComponent', () => {
  let component: SellerUpdateOrderComponent;
  let fixture: ComponentFixture<SellerUpdateOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerUpdateOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerUpdateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
