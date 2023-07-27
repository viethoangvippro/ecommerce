
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { category, product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-category',
  templateUrl: './seller-update-category.component.html',
  styleUrls: ['./seller-update-category.component.css']
})
export class SellerUpdateCategoryComponent implements OnInit {

  productMessage: undefined | string;
  categories: category[] = [];
  categoryData: category |any;


  constructor(private api:CategoryService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    let categoryId = this.route.snapshot.params['id'];
    console.warn(categoryId);

      this.api.getCategory(categoryId).subscribe((data) => {
        console.warn(data);
        this.categoryData = data;

      });

      this.getCategories();

  }

  getCategories(): void {
    this.api.categoryList()
      .subscribe(categories => this.categories = categories);
  }



  submit(data: any) {
    if (this.categoryData) {
      data.id = this.categoryData.id;

    }
    this.api.updateCategory(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Cập nhật sản phẩm thành công';
        alert('Cập nhật sản phẩm thành công');
        this.router.navigate(['/seller-category'])

      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 1000);
    console.warn(data);
  }

}
