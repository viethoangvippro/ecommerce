import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-allproduct',
  templateUrl: './allproduct.component.html',
  styleUrls: ['./allproduct.component.css']
})
export class AllproductComponent implements OnInit {
  currencyCode = 'VND';
  currencyFormat = 'symbol';
  listCategory: any;
  productList: any;
  trendyProducts:any | product[];
  p :any;
  sortOrder: 'asc' | 'desc' = 'asc';
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
  sortByName(): void {
    this.product.getProducts().subscribe(trendyProducts => {
      this.trendyProducts = trendyProducts.sort((a, b) => (a.name > b.name) ? 1 : -1);
    });
  }

  sortByName1():void{
    this.product.getProducts().subscribe(trendyProducts=>{
      this.trendyProducts = this.trendyProducts.sort((a: { name: string; }, b: { name: string; }) => {
        if (this.sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    });
    }
  sortByPrice():void{
    this.product.getProducts().subscribe(trendyProducts => {
      this.trendyProducts = trendyProducts.sort((a, b) => a.price - b.price);
    });
  }

  sortByRating():void{
    this.product.getProducts().subscribe(trendyProducts =>{
      this.trendyProducts = trendyProducts.sort((a,b) => a.rating - b.rating);
    })
  }

}
