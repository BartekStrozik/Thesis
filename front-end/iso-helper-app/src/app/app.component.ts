import { Component } from '@angular/core';
import { AuthenticationService } from '@core/authentication/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'iso-helper-app';

  constructor(){
    
  }

  ngOnInit() {
  }

  logout() {
  }
}
