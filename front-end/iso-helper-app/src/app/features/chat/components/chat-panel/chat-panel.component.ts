
import { Component, OnInit } from '@angular/core';
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@core/authentication/models/user.model';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss']
})
export class ChatPanelComponent implements OnInit {
  chosenUser!: User;
  //chosenUser: Subject<User> = new Subject<User>();
  resetFormSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

  }

  chooseUser(user: User) {
    //this.clearMessenger();
    //this.chosenUser.next(user);
    this.chosenUser = user;
  }

  clearMessenger() {
    var div = document.getElementById('messenger');
    if(div == null) return;
    while(div.firstChild) div?.removeChild(div.firstChild);
  }

}
