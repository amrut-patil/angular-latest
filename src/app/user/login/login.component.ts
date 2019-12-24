import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ApplicationErrorHandler } from 'src/app/shared/errorHandler';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.formBuilder.group({});

  constructor(private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder, private notificationService: NotificationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onLogin() {
    let request = {
      email: this.loginForm.value['email'],
      password: this.loginForm.value['password']
    }

    this.authenticationService.login(request).then(() => {
    }).catch((error) => {
      ApplicationErrorHandler.addServerError(this.loginForm, error, this.notificationService);
    });
  }

}
