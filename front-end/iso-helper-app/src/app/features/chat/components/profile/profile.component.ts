import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@core/authentication/models/user.model';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { Friends } from '@features/chat/models/friends.model';
import { NotificationsService } from '@features/user-panel/services/notifications.service';
import { UserService } from '@features/user-panel/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User;
  alreadyInvited: boolean = false;

  constructor(private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private notifiactionService: NotificationsService) { }

  ngOnInit(): void {
    /*this.route.paramMap.subscribe(paramMap => {
      let userIdString = paramMap.get('userId');
      this.userService.getUserData(Number(userIdString)).subscribe(user => {
        this.user = user;
      })
    })*/
  }

  createImagePath(src: string){
    return `https://localhost:44347/${src}`;
  }

  invite() {
    let friends: Friends = {
      "id": 0,
      "userId": 0,//this.authService.currentUserValue.id,
      "invitedId": 0,//this.user.id,
      "accepted": 0
    }
    this.notifiactionService.inviteUser(friends);
  }

}
