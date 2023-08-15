import { User } from './../data-type';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-user',
  templateUrl: './seller-user.component.html',
  styleUrls: ['./seller-user.component.css']
})
export class SellerUserComponent implements OnInit {
  allUser : User |any;
  p:any;
  productMessage: undefined | string;
  icon = faTrash;
  iconEdit=faEdit;
  pageSize: string | number | undefined ;
  constructor(private api: UserService,private router: Router) { }

  ngOnInit(): void {
    this.api.getAllUser().subscribe(data=>{
      this.allUser = data;
    })
  }

  deleteUser(id: any){
    this.api.deleteUser(id).subscribe(result=>{
      if (result) {
        this.productMessage = 'Xoá sản phẩm thành công';
        alert('Xoá sản phẩm thành công');
        this.list();
        this.router.navigate(["/seller-user"])
      }
    })
  }
  list() {
    this.api.getAllUser().subscribe((result) => {
      if (result) {
        this.allUser = result;
      }
    });
  }
}
