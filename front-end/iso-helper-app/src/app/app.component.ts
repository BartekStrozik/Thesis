import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  displayBase: boolean = true;

  loginChosen: boolean = false;
  registerChosen: boolean = false;
  isAuthenticated: boolean = false;

  constructor(public authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    
  }

  logout() {
    this.authService.logout();
  }

  authStart(option: any){
    this.displayBase = false;
    if(option == "login") this.loginChosen = true;
    if(option == "register") this.registerChosen = true;
  }

  displayMain(event: any){
    this.isAuthenticated = true;
    this.displayBase = false;
    this.loginChosen = false;
    this.registerChosen = false;
  }

  backToBase(event: any) {
    this.logout();
    document.getElementById('main')?.classList.add('.hide');
    this.isAuthenticated = false;
    this.displayBase = true;
    this.loginChosen = false;
    this.registerChosen = false;
    this.router.navigate(['/']);
  }
}
