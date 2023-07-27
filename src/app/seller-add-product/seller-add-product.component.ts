
import { Component, OnInit } from '@angular/core';
import { category, product } from '../data-type';
import { ProductService } from '../services/product.service';
import { SellerHomeComponent } from '../seller-home/seller-home.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  productData: any|product;

  constructor(private product: ProductService,private router: Router) {}
  categories: category[] = [];
  products: product[]=[];
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.product.categoryList()
      .subscribe(categories => this.categories = categories);
  }

  submit(data: product) {
    this.product.addProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {

        alert('Thêm sản phẩm thành công');
        this.router.navigate(['/seller'])
      }
    });

    setTimeout(() => {
      this.addProductMessage=undefined
    }, 3000);
  }
}
