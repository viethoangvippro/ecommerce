import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductReviewsComponent } from './product-reviews/product-reviews.component';
import { ProductComponent } from './product/product.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { RouterModule } from '@angular/router';
import { ProductModule } from './product/product.module';
import { AboutComponent } from './about/about.component';
import { SellerComponent } from './seller/seller.component';
import { ContactComponent } from './contact/contact.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SellerCategoryComponent } from './seller-category/seller-category.component';
import { SellerOrderComponent } from './seller-order/seller-order.component';
import { SellerAddCategoryComponent } from './seller-add-category/seller-add-category.component';
import { SellerContactComponent } from './seller-contact/seller-contact.component';
import { SellerUpdateCategoryComponent } from './seller-update-category/seller-update-category.component';
import { SellerUpdateOrderComponent } from './seller-update-order/seller-update-order.component';
import { UserAccountEditComponent } from './user-account-edit/user-account-edit.component';
import { SellerUserComponent } from './seller-user/seller-user.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    FooterComponent,
    SearchComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    CartPageComponent,
    CheckoutComponent,
    MyOrdersComponent,
    ProductReviewsComponent,
    ProductComponent,
    AboutComponent,
    SellerComponent,
    ContactComponent,
    ConfirmDialogComponent,
    SellerCategoryComponent,
    SellerOrderComponent,
    SellerAddCategoryComponent,
    SellerContactComponent,
    SellerUpdateCategoryComponent,
    SellerUpdateOrderComponent,
    UserAccountEditComponent,
    SellerUserComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,RouterModule,ProductModule,
    MatIconModule,
    MatDialogModule,
    NoopAnimationsModule,
    CarouselModule,
    ScrollToModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
