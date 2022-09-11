import { Component, Input, OnInit } from '@angular/core';
import { User } from '@core/authentication/models/user.model';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { Message } from '@features/chat/models/messages.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() msg!: Message;
  @Input() isOwn!: boolean;
  content: string = "";
  timeStamp: string = "";

  constructor() { }

  ngOnInit(): void {
    this.content = this.msg.content;
    this.timeStamp = this.msg.receivedAt;
  }

}
