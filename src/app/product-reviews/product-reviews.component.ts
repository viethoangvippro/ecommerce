import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { cart, product, reviews } from '../data-type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css']
})
export class ProductReviewsComponent implements OnInit {
  rating: any;
  comment: string | any;
  product: any | product[];
  user: any;
  trendyProducts:any | product[];
  listReviews:any|reviews;
  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined;
  currencyCode = 'VND';
  currencyFormat = 'symbol';

  productId: any;
  userId:any;
   p :any;
  productReviews: reviews | any;

  review: reviews[] = [];
  constructor(
    private productService: ProductService,
    private userService: UserService,
    private route:ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.params['id'] // replace with actual product ID
    this.productService.getProduct(productId).subscribe(
      (product: any) => {
        this.product = product;
      },
      (error: any) => {
        console.error('Failed to fetch product:', error);
      }
    );

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
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId,
        };
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result: any) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }
  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId);
    } else {
      console.warn('cartData', this.cartData);

      this.cartData &&
        this.product.removeToCart(this.cartData.id).subscribe((result: any) => {
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
        });
    }
    this.removeCart = false;
  }
  saveProductReview() {
    const review = {

      rating: this.rating,
      comment: this.comment,
      productId: this.product.id,
      date_create :new Date(),
      userId: this.user.id,

    };

    // Update product rating
    const newProduct = {
      ...this.product,
      rating: (this.product.rating * this.product.numReviews + this.rating) / (this.product.numReviews + 1),
      numReviews: this.product.numReviews + 1,

    };

    // Save product review

    this.productService.saveProductReview(review,this.product.id).subscribe(
      (response: any) => {
        console.log('Product review saved successfully:', response);
        // Update product in mockAPI
        this.productService.updateProduct(newProduct).subscribe(
          (response) => {
            console.log('Product updated successfully:', response);
            this.router.navigate(['/'])
          },
          (error) => {
            console.error('Failed to update product:', error);
          }
        );
      },
      (error: any) => {
        console.error('Failed to save product review:', error);
      }
    );
  }

  }
