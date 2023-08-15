import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, login, signUp } from '../data-type';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

invalidUserAuth= new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router:Router) { }
  isLoggedIn = false;
  userId :any;

  login(userId: string) {
    this.isLoggedIn = true;
    this.userId = userId;
  }

  logout() {
    this.isLoggedIn = false;
    this.userId = '';
  }

  get isLoggedIn1(): boolean {
    return this.isLoggedIn;
  }

  getAllUser():Observable<any>{
    return this.http.get<any>('http://localhost:3000/users');
  }
  deleteUser(id : any):Observable<any>{
    return this.http.delete(`http://localhost:3000/users/${id}`);
  }
  getEmail(): Observable<any>{
    return this.http.get<any>('http://localhost:3000/users');

  }
  checkEmailExists3(email: string) {
    const url = `http://localhost:3000/users?email=${email}`;
    return this.http.get(url);
  }
  private apiEmail = 'http://localhost:3000';
 checkEmailExists(email: string) : Observable<any>{
    // Gửi yêu cầu GET đến MockAPI để kiểm tra email đã tồn tại hay chưa
    const result = this.http.get<any>(`${this.apiEmail}/users?email=${email}`);
    console.log("lllll", result);
    return of(result)

  }
  async checkEmailExists1(email: string): Promise<Observable<boolean>> {

    const result = await  this.http.get<boolean>(`${this.apiEmail}/users?email=${email}`);


    return result;
  }

  checkEmailExists2(email: string) {
    // Gửi yêu cầu kiểm tra sự tồn tại của email đến API hoặc cơ sở dữ liệu
    return this.http.post<boolean>('http://localhost:3000/users?email=', { email });
  }
  registerUser(user: any) {
    // Gửi yêu cầu POST đến MockAPI để đăng ký người dùng
    return this.http.post(`${this.apiEmail}/users`, user);
  }
  private url3 = 'http://localhost:3000'
  checkEmail(email: string) {
    const url = `${this.url3}/users?email=${email}`;
    return this.http.get(url);
  }

  get userId1(): any {
    return this.userId;
  }
  private apiUrl = 'http://localhost:3000/contacts';

  addContact(name: string, email: string, phone: string, comment: string) {
    return this.http.post(this.apiUrl, { name, email, phone, comment });
  }



  userSignUp(user:signUp){
   this.http.post('http://localhost:3000/users',user,{observe:'response'})
   .subscribe((result)=>{
    if(result){
      localStorage.setItem('user',JSON.stringify(result.body));
      alert('Đăng ký thành công!')
      this.router.navigate(['/']);
    }

   })

  }
  private baseUrl = 'http://localhost:3000/users';


  register(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }
  private apiUrl1 = 'http://localhost:3000/users';
  getUserById(id: number): Observable<User> {
    const url = `${this.apiUrl1}/${id}`;
    return this.http.get<User>(url);
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl1}/${user.id}`;
    return this.http.put<User>(url, user);
  }



  userLogin(data:login){
    this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe:'response'}
    ).subscribe((result)=>{
      if(result && result.body?.length){
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
        this.invalidUserAuth.emit(false)
      }else{
        this.invalidUserAuth.emit(true)
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }


  private currentUserUrl = 'http://localhost:3000/users'; // endpoint để lấy thông tin người dùng hiện tại


  getCurrentUserId(): Observable<any> {
    return this.http.get(this.currentUserUrl).pipe(
      map((user: any) => user.id)
    );
  }
}
