import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthenticationService } from '@core/authentication/services/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Output() logoutClick: EventEmitter<string> = new EventEmitter();

  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  emitLogout(event: any) {
    console.log("logging out...")
    //this.authService.logout();
    //document.getElementById("container").classList.add(".hide");
    this.logoutClick.emit("");
  }

}
