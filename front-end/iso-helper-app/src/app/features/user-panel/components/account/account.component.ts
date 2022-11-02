import { Component, OnInit } from '@angular/core';
import { User } from '@core/authentication/models/user.model';
import { AuthenticationService } from '@core/authentication/services/authentication.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  currentUser!: User;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getUser();
  }

  createImagePath(src: string){
    return `https://localhost:44347/${src}`
  }

  getUser() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    })
  }

}
