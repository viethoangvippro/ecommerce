import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css']
})
export class ProductReviewsComponent implements OnInit {
  userId: string |any;

  review = {
    userId: '',
    productId: '123',
    rating: 4.5,
    comment: 'Sản phẩm rất tốt!'
  };

  constructor(private authService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
    this.authService.getCurrentUserId().subscribe(
      userId => {
        this.userId = userId;
        this.review.userId = userId;
      },
      err => {
        console.log(err); // in ra lỗi nếu có
      }
    );
  }

  submitReview() {
    this.productService.addProductReview(this.review).subscribe(
      res => {
        console.log(res); // in ra kết quả trả về từ mockAPI
      },
      err => {
        console.log(err); // in ra lỗi nếu có
      }
    );
  }
  }
