import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommentsInterface } from '../models/comments.interafce';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private apiUrl = 'https://localhost:44347/api'

  constructor(private http: HttpClient) { }

  getComments(): Observable<CommentsInterface[]> {
    return this.http.get<CommentsInterface[]>(this.apiUrl + '/Comment');
  }

  getCommentsForPost(postId: number): Observable<CommentsInterface[]> {
    const url = `${this.apiUrl}/Comment/${postId}`;
    var currentUser = localStorage.getItem('currentUser');
    var token = "";
    if(currentUser != null) token = JSON.parse(currentUser)['token'];
    let newHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    const newHttpOptions = {
      headers: newHeaders
    } 
    return this.http.get<CommentsInterface[]>(url, newHttpOptions);
  }

  addComment(comment: CommentsInterface): Observable<CommentsInterface> {
    return this.http.post<CommentsInterface>(this.apiUrl + '/Comment', comment);
  }
}
