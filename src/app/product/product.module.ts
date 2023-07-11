import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product.routing.module';
import { ProductByCategoryComponent } from './product-by-category/product-by-category.component';
import { RouterModule } from '@angular/router';
import { AllproductComponent } from './allproduct/allproduct.component';

import { NgxPaginationModule, PaginatePipe } from 'ngx-pagination';

@NgModule({
  declarations: [
    ProductByCategoryComponent,
    AllproductComponent,

  ],
  exports:[
    ProductByCategoryComponent,
    AllproductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
    RouterModule,
    NgxPaginationModule

  ]
})
export class ProductModule { }
