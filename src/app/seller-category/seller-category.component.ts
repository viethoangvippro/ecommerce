import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { category } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-category',
  templateUrl: './seller-category.component.html',
  styleUrls: ['./seller-category.component.css']
})
export class SellerCategoryComponent implements OnInit {
  p:any;
  pageSize: string | number | undefined ;

  productMessage: undefined | string;
  icon = faTrash;
  iconEdit=faEdit;
  categoryList:category[]=[];
  constructor(private api: CategoryService,private router: Router) { }

  ngOnInit(): void {
    this.api.categoryList().subscribe(data=>{
      this.categoryList = data;
    })
  }
  deleteCategory(id: number) {
    this.api.deleteCategory(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Xoá sản phẩm thành công';
        alert('Xoá sản phẩm thành công');
        this.list();
        this.router.navigate(["/seller-category"])
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;

    }, 500);
  }


  list() {
    this.api.categoryList().subscribe((result) => {
      if (result) {
        this.categoryList = result;

      }
    });
  }

}
