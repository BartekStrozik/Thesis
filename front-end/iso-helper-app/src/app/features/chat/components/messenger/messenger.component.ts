import { Component, Input, OnInit } from '@angular/core';
import { User } from '@core/authentication/models/user.model';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { Message } from '@features/chat/models/messages.model';
import { MessagesService } from '@features/chat/services/messages.service';
import { Observable, Subject } from 'rxjs';
import { Event } from '@angular/router';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {
  @Input() user!: User;
  currentUser!: User;
  messages: Message[] = [];
  inputMessage!: string;

  constructor(private authService: AuthenticationService, private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;

    if(this.user!=null){
      this.messagesService.getConversation(this.currentUser.id, this.user.id).subscribe(messages => {
        this.messages = JSON.parse(messages);
      });
    }
  }

  ngOnChanges(){
    this.currentUser = this.authService.currentUserValue;
    this.messagesService.getConversation(this.currentUser.id, this.user.id).subscribe(messages => {
      this.messages = JSON.parse(messages);
    });
  }

  createImagePath(src: string){
    return `https://localhost:44347/${src}`;
  }

  send(){
    this.messagesService.sendMessage(this.currentUser.id, this.user.id, this.inputMessage);
    this.inputMessage = "";
    this.ngOnChanges();
  }

  handleSubmit(event: any){
    if (event.keyCode === 13) {
      this.send();
    }
  }

}
