import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core/authentication/models/user.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:44347/api'

  constructor(private http: HttpClient) { }
  
  getAllUsers() {
    return this.http.get<User[]>(this.apiUrl + '/User');
  }

  getUserData(userId: number) {
    const url = `${this.apiUrl}/User/${userId}`;
    return this.http.get<User>(url)
  }

  updateUser(user: User) {
    return this.http.put(this.apiUrl + '/User', user, httpOptions);
  }
}
