import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, login, signUp } from '../data-type';
import { Observable, map } from 'rxjs';

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
      this.router.navigate(['/']);
    }

   })

  }
  private baseUrl = 'http://localhost:3000/users';

  checkEmail(email: any): Observable<{ exists: boolean }> {
    const url = `${this.baseUrl}?email=${email}`;
    return this.http.get<{ exists: boolean }>(url);
  }
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
