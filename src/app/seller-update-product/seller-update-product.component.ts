

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { category, product } from '../data-type';
import { ProductService } from '../services/product.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],

})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product;
  productMessage: undefined | string;
  categories: category[] = [];
  products: product[]=[];
  constructor(private route: ActivatedRoute, private product: ProductService,private router: Router) {}


  priceControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$')
  ]);
  nameControl = new FormControl('', Validators.required);

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        console.warn(data);
        this.productData = data;

      });
      this.getCategories();
      this.getProducts();
  }

  getCategories(): void {
    this.product.categoryList()
      .subscribe(categories => this.categories = categories);
  }

  getProducts(): void {
    this.product.productList()
      .subscribe(products => this.products = products);
  }
  submit(data: any) {
    if (this.productData) {
      data.id = this.productData.id;
      data.categoryId = this.productData.categoryId;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Cập nhật sản phẩm thành công';
        alert('Cập nhật sản phẩm thành công');
        this.router.navigate(['/seller'])

      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 1000);
    console.warn(data);
  }


}
