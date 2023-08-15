import { Component, OnInit } from '@angular/core';
import { User, cart, login, product, signUp } from '../data-type';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';



function passwordMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['passwordMismatch']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ passwordMismatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
export function noSpecialCharacterValidator(): ValidatorFn {
  const specialCharacterRegex = /^[^!@#$%^&*(),.?":{}|<>]+$/; // Regex to match strings without special characters

  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const containsSpecialCharacter = !specialCharacterRegex.test(value);

    return containsSpecialCharacter ? { noSpecialCharacter: true } : null;
  };
}
export function passwordValidator(): ValidatorFn {
  const passwordRegex = /^(?=.*[a-zA-Z]).+$/; // Regex để kiểm tra mật khẩu chứa ít nhất một chữ cái

  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const isPasswordValid = passwordRegex.test(value);

    return isPasswordValid ? null : { passwordInvalid: true };
  };
}

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent  {
  showLogin: boolean = true;
  username: string |any;
  email: string |any;
  usernameExists: boolean |any;
  emailExists: boolean |any;
  authError: string = '';
  // signupForm: FormGroup;
  errorMessage : any;
  users: User = {
    email: '', password: '',
    id: 0 , name:''
  };

  registrationForm: FormGroup | any;
  constructor(private fb: FormBuilder,private user: UserService, private product: ProductService,private http: HttpClient,private route :ActivatedRoute) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),noSpecialCharacterValidator(),passwordValidator()]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: passwordMatch('password', 'confirmPassword')
    });

  }

  onSubmit(email: string) {
    // Kiểm tra sự tồn tại của email
    this.user.checkEmailExists2(email).subscribe(
      (emailExists: boolean) => {
        if (emailExists) {
          // Hiển thị thông báo lỗi rằng email đã tồn tại
          console.log('Email đã tồn tại. Vui lòng sử dụng một email khác.');
        } else {
          // Tiếp tục xử lý khi email không tồn tại
          // Thực hiện các hành động khác, ví dụ: gửi yêu cầu lưu email vào cơ sở dữ liệu
          console.log('Email mới đã được thêm vào cơ sở dữ liệu.');
        }
      },
      (error: any) => {
        // Xử lý lỗi nếu có
        console.error('Đã xảy ra lỗi:', error);
      }
    );
  }




  // ngOnInit(): void {
  //   this.user.userAuthReload();

  // }
  checkEmail() {
    this.user.checkEmailExists3(this.email).subscribe(
      (response: any) => {
        // Kiểm tra kết quả trả về từ MockAPI
        if (response.length > 0) {
          // Email đã tồn tại
          this.emailExists = true;
        } else {
          // Email không tồn tại
          this.emailExists = false;

        }
      },
      (error) => {
        console.error('Lỗi kiểm tra email:', error);
      }
    );
  }


  signUp(data: signUp) {
    this.user.checkEmailExists3(this.email).subscribe(
      (response: any) => {
        // Kiểm tra kết quả trả về từ MockAPI
        if (response.length > 0) {
          // Email đã tồn tại
          this.emailExists = true;
        } else {
          // Email không tồn tại
          this.emailExists = false;
        // Thực hiện đăng ký người dùng
        this.user.userSignUp(data);
        }
      },
      (error) => {
        console.error('Lỗi kiểm tra email:', error);
      }
    );

  }


  login(data: login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      console.warn(result);
      if (result) {
        this.authError = 'Sai email hoặc mật khẩu';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }

  openSignUp() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);

      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn('data is stored in DB');
            }
          });
        }, 500);
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      });
    }

    setTimeout(() => {
      this.product.getCartList(userId);
    }, 1000);
  }
}
