
import { Component, OnInit } from '@angular/core';
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@core/authentication/models/user.model';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { UsersFilters } from '@features/chat/models/users-filters.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss']
})
export class ChatPanelComponent implements OnInit {
  chosenUser!: User;
  resetFormSubject: Subject<boolean> = new Subject<boolean>();
  filters: UsersFilters = {
    "lastName": "",
    "place": ""
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

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
