import { Component, Input, OnInit } from '@angular/core';
import { Notification } from '@features/user-panel/models/notification.model'; 

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {
  @Input() notification!: Notification;


  constructor() { }

  ngOnInit(): void {
  }

  createImagePath(src: string){
    return `https://localhost:44347/${src}`;
  }

}
