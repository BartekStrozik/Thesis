import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '@core/authentication/services/authentication.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  @Output() logoutClick: EventEmitter<string> = new EventEmitter();

  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout() {
    this.logoutClick.emit("");
  }

}
