import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-allproduct',
  templateUrl: './allproduct.component.html',
  styleUrls: ['./allproduct.component.css']
})
export class AllproductComponent implements OnInit {

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


}
