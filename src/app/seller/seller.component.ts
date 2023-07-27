import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  productList: any | product[];
  trendyProducts:any| product[];
  p:any;
  pageSize: string | number | undefined ;

  productMessage: undefined | string;
  icon = faTrash;
  iconEdit=faEdit;
  constructor(private product: ProductService,private router: Router) { }

  ngOnInit(): void {
    this.product.trendyProducts().subscribe(data =>{
      this.trendyProducts =data;
    })
  }
  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Xoá sản phẩm thành công';
        alert('Xoá sản phẩm thành công');
        this.list();
        this.router.navigate(["/seller-home"])
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;

    }, 500);
  }
  list() {
    this.product.productList().subscribe((result) => {
      if (result) {
        this.productList = result;

      }
    });
  }

}
