import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@core/authentication/models/user.model';
import { UsersFilters } from '@features/chat/models/users-filters.model';
import { UserService } from '@features/user-panel/services/user.service';

@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.scss']
})
export class UsersPanelComponent implements OnInit {
  @Input() filters!: UsersFilters;
  firstNameFilter: string = "";
  lastNameFilter: string = "";
  placeFilter: string = "";

  @Output() chosenUser: EventEmitter<User> = new EventEmitter();
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    })

    this.firstNameFilter = this.filters.firstName;
    this.lastNameFilter = this.filters.lastName;
    this.placeFilter = this.filters.place;
  }

  ngOnChanges() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    })
    
    console.log(this.filters)
    this.firstNameFilter = this.filters.firstName;
    this.lastNameFilter = this.filters.lastName;
    this.placeFilter = this.filters.place;
  }

  createImagePath(src: string){
    return `https://localhost:44347/${src}`;
  }

  chooseUser(user: User){
    this.chosenUser.emit(user);
  }

}
