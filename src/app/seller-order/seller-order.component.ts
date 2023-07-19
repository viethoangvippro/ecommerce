import { order } from './../data-type';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-order',
  templateUrl: './seller-order.component.html',
  styleUrls: ['./seller-order.component.css']
})
export class SellerOrderComponent implements OnInit {
  orderList : order[] =[];
  icon = faTrash;
  iconEdit=faEdit;
  productMessage: any;
  currencyCode = 'VND';
  currencyFormat = 'symbol';
  constructor(private product: ProductService,private router: Router) { }

  ngOnInit(): void {
    this.list();
  }
  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Xoá sản phẩm thành công';

        this.list();
        this.router.navigate(["/seller-home"])
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
      this.router.navigate(["/seller"])
    }, 500);
  }
  list(){
    this.product.getOrder().subscribe(data => {
      this.orderList = data
    })
  }

}
