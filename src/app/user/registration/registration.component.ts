import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public user: User;
  public registrationForm = this.formBuilder.group({});

  constructor(private registrationService: RegistrationService, private formBuilder: FormBuilder) {
    this.user = new User();
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmpassword: new FormControl('', Validators.required)
    });
  }

  private onRegister() {
    this.user.firstname = this.registrationForm.value['firstname'];
    this.user.lastname = this.registrationForm.value['lastname'];
    this.user.email = this.registrationForm.value['email'];
    this.user.password = this.registrationForm.value['password'];
    this.user.confirmpassword = this.registrationForm.value['confirmpassword'];

    this.registrationService.register(this.user).then((user) => {
      this.user = user;
    }).catch((error) => {
      console.log(error);
    });
  }

}
