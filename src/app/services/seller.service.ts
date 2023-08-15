import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { login, signUp } from '../data-type';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn= new BehaviorSubject<boolean>(false);
  isLoginError= new EventEmitter<boolean>(false)

  constructor(private http:HttpClient, private router:Router) { }

  checkEmailExists3(email: string) {
    const url = `http://localhost:3000/seller?email=${email}`;
    return this.http.get(url);
  }
  userSignUp(data:signUp){
    this.http.post('http://localhost:3000/seller',
    data,
    {observe:'response'}).subscribe((result)=>{
      console.warn(result)
      if(result){
        localStorage.setItem('seller',JSON.stringify(result.body))
        alert('Đăng ký thành công!')
      }
    })
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller'])
    }
  }


  private apiEmail = 'http://localhost:3000';
  checkEmailExists(email: string) :Observable<any>{
    // Gửi yêu cầu GET đến MockAPI để kiểm tra email đã tồn tại hay chưa
    return this.http.get<boolean>(`${this.apiEmail}/seller?email=${email}`);
  }
  registerSeller(user: any) {
    // Gửi yêu cầu POST đến MockAPI để đăng ký người dùng
    return this.http.post(`${this.apiEmail}/seller`, user);
  }

  userLogin(data:login){
   this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
   {observe:'response'}).subscribe((result:any)=>{
    console.warn(result)
    if(result && result.body && result.body.length===1){
      this.isLoginError.emit(false)
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller'])
    }else{
      console.warn("Đăng nhập không thành công");
      this.isLoginError.emit(true)
    }
   })
  }
}
