
import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { contact } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-contact',
  templateUrl: './seller-contact.component.html',
  styleUrls: ['./seller-contact.component.css']
})
export class SellerContactComponent implements OnInit {
  icon = faTrash;
  iconEdit=faEdit;
  p:any;
  productMessage: any;
  currencyCode = 'VND';
  currencyFormat = 'symbol';
  contactList: contact[]=[];
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.product.getContact().subscribe(data => {
      this.contactList = data
    })
  }

}
