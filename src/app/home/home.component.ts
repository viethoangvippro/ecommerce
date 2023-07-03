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
  constructor(private product:ProductService) {
    const myScript = document.createElement('script');
    myScript.src = '/assets/js/main.js';
    myScript.src = '/assets/js/mixitup.min.js';
    document.body.appendChild(myScript);
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
