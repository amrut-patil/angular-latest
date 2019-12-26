import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { RegistrationService } from '../registration.service';
import { ApplicationErrorHandler } from 'src/app/shared/errorHandler';
import { NotificationService } from 'src/app/shared/notification.service';
import { RegistrationValidator } from './registration-validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public user: User;  
  public registrationForm = this.formBuilder.group({});
  public RegistrationValidator = RegistrationValidator;

  constructor(private registrationService: RegistrationService, private formBuilder: FormBuilder,
    private notificationService: NotificationService) {
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
      this.notificationService.showInformation("Registration complete !")
    }).catch((error) => {
      ApplicationErrorHandler.addServerError(this.registrationForm, error, this.notificationService);
    });
  }

}
