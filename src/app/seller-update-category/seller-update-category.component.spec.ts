import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUpdateCategoryComponent } from './seller-update-category.component';

describe('SellerUpdateCategoryComponent', () => {
  let component: SellerUpdateCategoryComponent;
  let fixture: ComponentFixture<SellerUpdateCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerUpdateCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerUpdateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
