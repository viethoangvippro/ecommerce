import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private contactService: UserService,private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const phone = form.value.phone;
    const comment = form.value.comment;
    this.contactService.addContact(name, email, phone, comment).subscribe(
      response => console.log(response),
      error => console.log(error)


    );this.router.navigate(['/']);
  }
}
