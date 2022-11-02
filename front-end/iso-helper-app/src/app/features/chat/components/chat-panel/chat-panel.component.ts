
import { Component, Input, OnInit } from '@angular/core';
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@core/authentication/models/user.model';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { UsersFilters } from '@features/chat/models/users-filters.model';
import { UserService } from '@features/user-panel/services/user.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss']
})
export class ChatPanelComponent implements OnInit {
  userId!: string;
  chosenUser!: User;
  resetFormSubject: Subject<boolean> = new Subject<boolean>();
  filters: UsersFilters = {
    "firstName": "",
    "lastName": "",
    "place": "",
  };

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      let userIdString = paramMap.get('userId');
      if(userIdString != null){
        this.userService.getUserData(Number(userIdString)).subscribe(user => this.chosenUser = user);
      }
    });
  }

  ngOnChanges(): void {
    this.route.paramMap.subscribe(paramMap => {
      let userIdString = paramMap.get('userId');
      if(userIdString != null){
        this.userService.getUserData(Number(userIdString)).subscribe(user => this.chosenUser = user);
      }
    });
  }

  chooseUser(user: User) {
    this.chosenUser = user;
  }

  filterUsersBy(filters: UsersFilters) {
    this.filters = filters;
  }

  clearMessenger() {
    var div = document.getElementById('messenger');
    if(div == null) return;
    while(div.firstChild) div?.removeChild(div.firstChild);
  }

}
