import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { category, product } from '../data-type';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  currencyCode = 'VND';
  currencyFormat = 'symbol';
  searchResult:undefined|product[];
  p:any;
  trendyProducts:any | product[];
  query:any;
  sortOrder: 'asc' | 'desc' = 'asc';
  pageSize: string | number | undefined ;
  listCategory: any;
  searchCategory: category | any;
  productList: product | any;
  constructor(private activeRoute: ActivatedRoute, private product:ProductService) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.warn(query);
    query && this.product.searchProduct(query).subscribe((result)=>{
      this.searchResult=result;

    })
    this.activeRoute.params.subscribe(data => {
      this.searchCategory = data['id'];
      this.product.getProductById(this.searchCategory).subscribe(categoryData =>{
        this.productList = categoryData;
      })
    });
    this.product.categoryList().subscribe(data =>{
      this.listCategory = data;
  }
  )

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
