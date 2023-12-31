
import { category, contact, reviews } from './../data-type';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';
import { Observable, Observer, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) { }
  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products', data);
  }
  productList() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }

  categoryList(){
    return this.http.get<category[]>('http://localhost:3000/category')
  }

  getProductById(categoryId:any) :Observable<any>{
    return this.http.get<category[]>(`http://localhost:3000/products?categoryId=${categoryId}`)
  }


  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  deleteProduct1(name: product) {
    return this.http.delete(`http://localhost:3000/products/${name}`);
  }
  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }


  private apiUrl = "http://localhost:3000/products";
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  private api = "http://localhost:3000/reviews";
  saveProductReview(review: any,productId :any): Observable<any> {
    review.productId = productId;
    return this.http.post<any>(`${this.api}`, review);
  }


  getProductReview(): Observable<any> {
    return this.http.get<any>(`${this.api}`);
  }

  getProductReviewById(productId:any): Observable<any> {
    return this.http.get<any>(`${this.api}/${productId}`);
  }

  private apiUrl2 = 'http://localhost:3000/reviews';
  getReviewsByProductId(productId: number): Observable<any> {
    const url1 = `${this.apiUrl2}?productId=${productId}`;
    return this.http.get<any>(url1);
  }

  private baseUrl = "http://localhost:3000";
  addProductReview(review: any) {
    return this.http.post(`${this.baseUrl}/reviews`, review);
  }
  submitReview(productId: number, userId: number, rating: number, review: string): Observable<any> {
    const url = `${this.baseUrl}/reviews`;
    const payload = { productId, userId, rating, review };
    return this.http.post(url, payload);
  }

  updateProduct(product: product) {
    return this.http.put<product>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }
  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=4');
  }

  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }

  searchProduct(query: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: number) {
    return this.http
      .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id);
  }
  getContact(){
    return this.http.get<contact[]>('http://localhost:3000/contacts')
  }
  private mockApiUrl = 'http://localhost:3000';
  getReviewCount(productId: number): Observable<number> {
    const url = `${this.mockApiUrl}/products/${productId}/reviews`;
    return this.http.get<any[]>(url).pipe(
      map(reviews => reviews.length)
    );
  }
  private apiUrl12 = 'http://localhost:3000/products';
  getProductbyName(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl12);
  }

  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId=' + userData.id);
  }

  getOrder(){
    return this.http.get<order[]>('http://localhost:3000/orders');
  }

  deleteCartItems(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId).subscribe((result) => {
      this.cartData.emit([]);
    })
  }

  cancelOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/'+orderId)

  }



}
