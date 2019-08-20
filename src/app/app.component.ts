import { Component } from '@angular/core';
import { RealTimeService } from './shared/real-time.service';
import { AuthenticationService } from './user/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authenticationService: AuthenticationService ) { }

  logout(){
    this.authenticationService.logout();    
  }

}
