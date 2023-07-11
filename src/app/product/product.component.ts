import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  listCategory: any;
  productList: any;
  p :any;
  id:any;
  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.product.categoryList().subscribe(data =>{
        this.listCategory = data;
    }
    )
    this.product.productList().subscribe(data =>{
      this.productList = data;
    })
  }

  getProduct(){
    this.product.getProductById(this.id).subscribe(data =>{

    })
  }
}
