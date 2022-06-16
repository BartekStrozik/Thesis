import { Component, OnInit } from '@angular/core';
import { Post } from '@features/post/models/post.model';
import { PostService } from '@features/post/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.refreshPostList();
  }

  refreshPostList() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    })
  }

}
