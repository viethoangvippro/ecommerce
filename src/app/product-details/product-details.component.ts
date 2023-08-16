import { ReposeReview, User, reviews } from './../data-type';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data-type';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined;
  currencyCode = 'VND';
  currencyFormat = 'symbol';
  rating: number | any;
  comment: string | any;
  productId: any;
  userId:any;
  user: any;  p :any;
  productReviews: reviews | any;
  reviewCount: number |any;
  review: reviews[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService,
    private userService: UserService,
    private el: ElementRef, private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}
  products: any[] = [];
  scrollToElement() {
    const element = this.elementRef.nativeElement.querySelector('#feedback');
    element.scrollIntoView({ behavior: 'smooth' });
  }
  OnInit() {
    this.product.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.log(error);
      }
    );
    let id = this.activeRoute.snapshot.paramMap.get('id');
    id &&
      this.product.getProduct(id).subscribe(
        (product: any) => {
          this.product = product;
        },
        (error: any) => {
          console.error('Failed to fetch product:', error);
        }
      );

    this.userId = this.userService.getCurrentUserId();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const img = this.el.nativeElement.querySelector('img');
    const rect = this.el.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const imgX = (mouseX / rect.width) * 100;
    const imgY = (mouseY / rect.height) * 100;

    this.renderer.setStyle(img, 'transform-origin', `${imgX}% ${imgY}%`);
  }
  zoomImage(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const img = target.querySelector('img');

    if (img) {
      const rect = target.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const imgX = (mouseX / rect.width) * 100;
      const imgY = (mouseY / rect.height) * 100;

      img.style.transformOrigin = `${imgX}% ${imgY}%`;
    }
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

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        this.productData = result;
        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (item: product) => productId === item.id.toString()
          );
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }

        let productIdReview =
          this.activeRoute.snapshot.paramMap.get('productIdReview');
        productIdReview &&
          this.product
            .getProductReviewById(productIdReview)
            .subscribe((data) => {
              this.productReviews = data;
            });

        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);

          this.product.cartData.subscribe((result) => {
            let item = result.filter(
              (item: product) =>
                productId?.toString() === item.productId?.toString()
            );
            if (item.length) {
              this.cartData = item[0];
              this.removeCart = true;
            }
          });
        }
      });
    const productid = this.activeRoute.snapshot.params['productId'];
    this.product
      .getReviewsByProductId(productid)
      .subscribe((response: reviews[]) => {


        this.review = response;
      });
      const productidReivew = this.activeRoute.snapshot.params['productId'];
      this.product.getReviewCount(productidReivew).subscribe(
        count => {
          this.reviewCount = count;
        },
        error => {
          console.log('Lỗi khi tải số lượng đánh giá:', error);
        }
      );
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
        this.product.addToCart(cartData).subscribe((result) => {
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
        this.product.removeToCart(this.cartData.id).subscribe((result) => {
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
      productId: this.productId.id,
      userId: this.user.id,
    };

    // Update product rating
    const newProduct = {
      ...this.productId,
      rating:
        (this.productId.rating * this.productId.numReviews + this.rating) /
        (this.productId.numReviews + 1),
      numReviews: this.productId.numReviews + 1,
    };

    // Save product review
    this.product.saveProductReview(review, this.productId.id).subscribe(
      (response: any) => {
        console.log('Product review saved successfully:', response);
        // Update product in mockAPI
        this.product.updateProduct(newProduct).subscribe(
          (response) => {
            console.log('Product updated successfully:', response);
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
