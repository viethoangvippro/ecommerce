import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../data-type';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
@Component({
  selector: 'app-user-account-edit',
  templateUrl: './user-account-edit.component.html',
  styleUrls: ['./user-account-edit.component.css']
})
export class UserAccountEditComponent implements OnInit {
  signupForm: FormGroup ;
  userData1 :User |any;
  errorMessage = '';

  constructor(private fb: FormBuilder,private route: ActivatedRoute, private userService: UserService) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: passwordMatch('password', 'confirmPassword')
    });
   }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.userService.getUserById(id).subscribe(
      response => {

        this.userData1 = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  update(): void {
    this.userService.updateUser(this.userData1).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

}
