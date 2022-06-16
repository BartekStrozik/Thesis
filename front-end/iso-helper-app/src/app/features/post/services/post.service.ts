import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@core/authentication/models/user.model';
import { Post } from '../models/post.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://localhost:44347/api'

  constructor(private http: HttpClient) { }

  getPost(id: string): Observable<Post> {
    const url = `${this.apiUrl}/Post/${id}`
    return this.http.get<Post>(url);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl + '/Post');
  }

  getUserPosts(userId: number): Observable<Post[]> {
    const url = `${this.apiUrl}/UserPosts/${userId}`;
    return this.http.get<Post[]>(url);
  }

  getPostOwner(userId: number): Observable<User> {
    const url = `${this.apiUrl}/PostOwner/${userId}`;
    return this.http.get<User>(url);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl + '/Post', post, httpOptions);
  }
  
  updatePost(post: Post) {
    return this.http.put(this.apiUrl + '/Post', post, httpOptions);
  }

  deletePost(id: number) {
    console.log("deleting...", id);
    const url = `${this.apiUrl}/Post/${id}`;
    return this.http.delete(url);
  }
}
