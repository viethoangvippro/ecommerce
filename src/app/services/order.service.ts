import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { order } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }
  categoryList() {
    return this.http.get<order>(`http://localhost:3000/orders/`);
  }

  updateOrder(order: order) {
    return this.http.put<order>(`http://localhost:3000/orders/${order.id}`,order);
  }
  getOrder(id: number) {
    return this.http.get<order>(`http://localhost:3000/orders/${id}`);
  }

}
