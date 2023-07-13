import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  p:any;
  pageSize: string | number | undefined ;
 popularProducts:any|product[];
 trendyProducts:any | product[];
 currencyCode = 'VND';
  currencyFormat = 'symbol';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private product:ProductService) {

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

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      this.popularProducts=data;
    })

    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    })
  }
}
