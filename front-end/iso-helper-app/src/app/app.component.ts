import { Component } from '@angular/core';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { CommentsInterface } from '@features/comments/models/comments.interafce';
import { CommentsService } from '@features/comments/services/comments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'iso-helper-app';

  constructor(public authService: AuthenticationService){
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
