import { Component, OnInit } from '@angular/core';
import { order } from '../data-type';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-seller-update-order',
  templateUrl: './seller-update-order.component.html',
  styleUrls: ['./seller-update-order.component.css']
})
export class SellerUpdateOrderComponent implements OnInit {

productMessage: any;
orderData : order |any;
  orderList: order[] |any;
  constructor(private api: OrderService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    let orderId = this.route.snapshot.params['id'];
    console.warn(orderId);
    orderId &&
      this.api.getOrder(orderId).subscribe((data) => {
        console.warn(data);
        this.orderData = data;

      });
      this.getOrders();

  }
  getOrders(): void {
    this.api.categoryList()
      .subscribe(orderList => {this.orderList = orderList});
  }



  submit(data: any) {
    if (this.orderData) {
      data.id = this.orderData.id;
      data.email = this.orderData.email;
      data.contact = this.orderData.contact;
      data.address = this.orderData.address;
      data.totalPrice = this.orderData.totalPrice;
      data.userId = this.orderData.userId;
    }
    this.api.updateOrder(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Cập nhật sản phẩm thành công';
        alert('Cập nhật sản phẩm thành công');
        this.router.navigate(['/seller-order'])

      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 1000);
    console.warn(data);
  }

}
