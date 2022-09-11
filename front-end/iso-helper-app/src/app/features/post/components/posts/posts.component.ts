import { Component, OnInit } from '@angular/core';
import { Filters } from '@features/filters/models/filters.model';
import { Post } from '@features/post/models/post.model';
import { PostService } from '@features/post/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  topicFilter: string = "";
  userFilter: string = "";
  placeFilter: string = "";

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.refreshPostList();
  }

  refreshPostList() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    })
  }

  filterBy(filtersObject: Filters) {
    //this.topicFilter = "";
    //this.userFilter = "";
    //this.placeFilter = "";

    this.topicFilter = filtersObject.topic;
    this.userFilter = filtersObject.user;
    this.placeFilter = filtersObject.place;
  }
}
