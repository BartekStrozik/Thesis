import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '@core/authentication/services/authentication.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  @Output() option: EventEmitter<string> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  login(){
    this.option.emit("login");
  }

  register(){
    this.option.emit("register");
  }
}
