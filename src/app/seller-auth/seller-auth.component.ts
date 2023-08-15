import { Component, OnInit } from '@angular/core';
import { signUp } from '../data-type';
import { SellerService } from '../services/seller.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  showLogin=false;
  authError:String='';
  sellerSignUp: FormGroup;
  email: string |any;
  emailExists: boolean |any;
  constructor(private seller: SellerService,private fb: FormBuilder,private http: HttpClient) {
    this.sellerSignUp = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),noSpecialCharacterValidator(),passwordValidator()]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: passwordMatch('password', 'confirmPassword')
    });
  }
  checkEmail() {
    this.seller.checkEmailExists3(this.email).subscribe(
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

  onSubmit(email: string) {
    // Kiểm tra sự tồn tại của email
    this.seller.checkEmailExists(email).subscribe(
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
  ngOnInit(): void {
    this.seller.reloadSeller()
  }
  signUp(data: signUp): void {
    this.seller.checkEmailExists3(this.email).subscribe(
      (response: any) => {
        // Kiểm tra kết quả trả về từ MockAPI
        if (response.length > 0) {
          // Email đã tồn tại
          this.emailExists = true;
        } else {
          // Email không tồn tại
          this.emailExists = false;
          this.seller.userSignUp(data);
        }
      },
      (error) => {
        console.error('Lỗi kiểm tra email:', error);
      }
    );


  }
  login(data: signUp): void {
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Sai email hoặc mật khẩu";
      }
    })
  }
  openLogin(){
    this.showLogin=true
  }
  openSignUp(){
    this.showLogin=false
  }
}
