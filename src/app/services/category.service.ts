import { category } from './../data-type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  deleteCategory(id: number) {
    return this.http.delete<category[]>(`http://localhost:3000/category/${id}`);
  }
  updateCategory(category: category) {
    return this.http.put<category>(`http://localhost:3000/category/${category.id}`,category);
   }

   getCategory(id:number){
    return this.http.get<category[]>(`http://localhost:3000/category/${id}`)
  }

  constructor(private http:HttpClient) { }
  categoryList(){
    return this.http.get<category[]>('http://localhost:3000/category')
  }

  addCategory(data: category) {
    return this.http.post('http://localhost:3000/category', data);
  }

}
