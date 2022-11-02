import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '@features/user-panel/services/notifications.service';
import { Notification } from '@features/user-panel/models/notification.model';
import { AuthenticationService } from '@core/authentication/services/authentication.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications!: Notification[];

  constructor(
    private authService: AuthenticationService,
    private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.refreshNotsList();
  }

  refreshNotsList(){
    this.notificationsService.getNotifications(this.authService.currentUserValue.id).subscribe(nots => {
      this.notifications = nots;
    })
  }
  
}
