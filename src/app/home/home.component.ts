import { priceSummary } from './../data-type';
import { Component, OnInit } from '@angular/core';
import { category, product } from '../data-type';
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
 categoryList:any |category[];
 currencyCode = 'VND';
  currencyFormat = 'symbol-narrow';

  sortOrder: 'asc' | 'desc' = 'asc';
  newProduct:any[] | any;

  constructor(private product:ProductService) {

  }

  convertToStars(rating: number): string {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      if (i < Math.round(rating)) {
        stars += '<span class="fa fa-star checked"></span>';
      } else {
        stars += '<span class="fa fa-star"></span>';
      }
    }
    return stars;
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
      this.trendyProducts = trendyProducts.sort((a, b) => a.priceDiscount - b.priceDiscount);
    });
  }

  sortByRating():void{
    this.product.getProducts().subscribe(trendyProducts =>{
      this.trendyProducts = trendyProducts.sort((a,b) =>b.rating - a.rating );
    })
  }

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      this.popularProducts=data;
    })

    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    })
    this.product.categoryList().subscribe((data) =>{
      this.categoryList = data;
    });
    this.product.getProducts().subscribe((data) =>{
      this.newProduct = data.slice(-8);
    })

  }
}
