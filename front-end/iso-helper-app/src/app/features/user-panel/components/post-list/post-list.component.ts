import { Component, OnInit } from '@angular/core';
import { User } from '@core/authentication/models/user.model';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { Post } from '@features/post/models/post.model';
import { PostService } from '@features/post/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  currentUser!: User;
  posts: Post[] = [];

  constructor(
    private authService: AuthenticationService,
    private postService: PostService
    ) { }

  ngOnInit(): void {
    this.getUser();
    this.refreshPostList();
  }

  getUser() {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  refreshPostList() {
    this.postService.getUserPosts(this.currentUser.id).subscribe(posts => {
      this.posts = posts;
    })
  }

}
