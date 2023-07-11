import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { NgModule } from '@angular/core';
import { ProductByCategoryComponent } from './product-by-category/product-by-category.component';
import { AllproductComponent } from './allproduct/allproduct.component';

const routes: Routes = [
    {path:'',component:AllproductComponent},
   { path: 'category/:id', component: ProductByCategoryComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
