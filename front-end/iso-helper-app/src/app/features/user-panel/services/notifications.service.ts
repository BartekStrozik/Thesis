import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Friends } from '@features/chat/models/friends.model';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private apiUrl = 'https://localhost:44347/api'

  constructor(private http: HttpClient) { }

  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl + '/Notification');
  }

  getNotifications(userId: number): Observable<Notification[]> {
    const url = `${this.apiUrl}/Notification/${userId}`;
    return this.http.get<Notification[]>(url);
  }

  inviteUser(friends: Friends) {
    console.log(friends);
    return this.http.post<Friends>(this.apiUrl + '/Friends', friends, httpOptions);
  }

}
