import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '@core/authentication/models/user.model';
import { UserService } from '@features/layout/services/user.service';

@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.scss']
})
export class UsersPanelComponent implements OnInit {
  @Output() chosenUser: EventEmitter<User> = new EventEmitter();
  users: User[] = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    })
  }

  chooseUser(user: User){
    this.chosenUser.emit(user);
  }

}
