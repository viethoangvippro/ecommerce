import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { category, product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.component.html',
  styleUrls: ['./product-by-category.component.css']
})
export class ProductByCategoryComponent implements OnInit {
  searchCategory: category | any;
  productList: product | any;
  listCategory: any;
  p:any;
  currencyCode = 'VND';
  currencyFormat = 'symbol';
  constructor(private activatedRoute: ActivatedRoute, private ProductsService: ProductService){

  }
  ngOnInit(): void{
    this.activatedRoute.params.subscribe(data => {
      this.searchCategory = data['id'];
      this.ProductsService.getProductById(this.searchCategory).subscribe(categoryData =>{
        this.productList = categoryData;
      })
    });
    this.ProductsService.categoryList().subscribe(data =>{
      this.listCategory = data;
  }
  )

}
}
