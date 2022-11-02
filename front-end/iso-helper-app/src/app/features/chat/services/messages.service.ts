import { Injectable } from '@angular/core';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  socket!: WebSocket;
  jwt!: any;

  constructor(private authService: AuthenticationService) { }

  getUserMessages(userId: number): Observable<string> {
    this.socket = new WebSocket(`wss://localhost:44347/${userId}`);

    this.socket.onopen = function (event) {
      this.send("request")
    }
    
    return new Observable(observer => {
      this.socket.onmessage = function (event) {
        observer.next(event.data);
      };
    });
  }

  getConversation(userId: number, interlocatorId: number): Observable<string> {
    this.socket = new WebSocket(`wss://localhost:44347/${userId}/${interlocatorId}`);

    this.socket.onopen = function (event) {
      this.send("request")
    }
    
    return new Observable(observer => {
      this.socket.onmessage = function (event) {
        observer.next(event.data);
      };
    });
  }

  sendMessage(userId: number, interlocatorId: number, content: string){
    this.socket = new WebSocket('wss://localhost:44347/snd');

    this.authService.currentUser.subscribe(user => this.jwt = user);
    let token = this.jwt.token;

    this.socket.onopen = function (event) {
      let message = {
        "userId": userId,
        "interlocatorId": interlocatorId,
        "content": content,
        "token": token
      }
      this.send(JSON.stringify(message))
    }
  }

}
