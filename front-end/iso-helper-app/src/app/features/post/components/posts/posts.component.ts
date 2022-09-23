import { Component, OnInit } from '@angular/core';
import { Filters } from '@features/filters/models/filters.model';
import { Post } from '@features/post/models/post.model';
import { PostService } from '@features/post/services/post.service';
import { User } from '@core/authentication/models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  topicFilter: string = "";
  //userFilter: User[] = [];
  placeFilter: string = "";

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.refreshPostList();
  }

  refreshPostList() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    })
  }

  filterBy(filtersObject: Filters) {
    this.topicFilter = filtersObject.topic;

    //let fullName = filtersObject.user.split(" ");
    /*if (fullName.length == 2) {
      this.postService.getUserIds(fullName[0], fullName[1]).subscribe(users => {
        users.forEach(id => this.userFilter.push(id))
      })
    }*/

    this.placeFilter = filtersObject.place;
  }
}
