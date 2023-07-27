import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { product, reviews } from '../data-type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css']
})
export class ProductReviewsComponent implements OnInit {
  rating: number |any;
  comment: string | any;

  product: any | product[];
  user: any;
  trendyProducts:any | product[];
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
    this.user = this.userService.getCurrentUserId();
  }

  saveProductReview() {
    const review = {
      rating: this.rating,
      comment: this.comment,
      productId: this.product.id,
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
