import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { ProductReviewsComponent } from './product-reviews/product-reviews.component';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';
import { SellerComponent } from './seller/seller.component';
import { ContactComponent } from './contact/contact.component';
import { SellerCategoryComponent } from './seller-category/seller-category.component';
import { SellerOrderComponent } from './seller-order/seller-order.component';
import { SellerAddCategoryComponent } from './seller-add-category/seller-add-category.component';
import { SellerContactComponent } from './seller-contact/seller-contact.component';
import { SellerUpdateCategoryComponent } from './seller-update-category/seller-update-category.component';
import { SellerUpdateOrderComponent } from './seller-update-order/seller-update-order.component';
import { UserAccountEditComponent } from './user-account-edit/user-account-edit.component';
import { SellerUserComponent } from './seller-user/seller-user.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: SellerAuthComponent,
    path: 'seller-auth',
  },
  {
    component: SellerHomeComponent,
    path: 'seller-home',
    canActivate: [AuthGuard],
  },{
    component: SellerUserComponent,
    path: 'seller-user',
    canActivate: [AuthGuard],
  },
  {
    component: SellerComponent,
    path: 'seller',
    canActivate: [AuthGuard],
  },
  {
    component: SellerAddProductComponent,
    path: 'seller-add-product',
    canActivate: [AuthGuard],
  },
  {
    component: SellerUpdateProductComponent,
    path: 'seller-update-product/:id',
    canActivate: [AuthGuard],
  },
  {
    component: SellerCategoryComponent,
    path: 'seller-category',
    canActivate: [AuthGuard],
  },
  {
    component: SellerAddCategoryComponent,
    path: 'seller-add-category',
    canActivate: [AuthGuard],
  },
  {
    component: SellerUpdateOrderComponent,
    path: 'seller-update-order/:id',
    canActivate: [AuthGuard],
  },
  {
    component: SellerContactComponent,
    path: 'seller-contact',
    canActivate: [AuthGuard],
  },
  {
    component: SellerUpdateCategoryComponent,
    path: 'seller-update-category/:id',
    canActivate: [AuthGuard],
  },
  {
    component: SellerOrderComponent,
    path: 'seller-order',
    canActivate: [AuthGuard],
  },
  {
    component: SearchComponent,
    path: 'search/:query',
  },
  {
    component: ProductDetailsComponent,
    path: 'details/:productId',
  },
  {
    component: UserAuthComponent,
    path: 'user-auth',
  },
  {
    component: CartPageComponent,
    path: 'cart-page',
  },
  {
    component: CheckoutComponent,
    path: 'checkout',

  },
  {
    component: MyOrdersComponent,
    path: 'my-orders',
  },
  { path: 'account/:id/edit', component: UserAccountEditComponent },
  {
    component: ProductReviewsComponent,
    path: 'product-reviews/:id',

  },
  {
    path: 'product',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
