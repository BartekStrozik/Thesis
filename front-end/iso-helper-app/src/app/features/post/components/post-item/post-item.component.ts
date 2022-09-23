import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@core/authentication/models/user.model'
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { Post } from '@features/post/models/post.model';
import { PostService } from '@features/post/services/post.service';
import { CommentsComponent } from '@features/comments/components/comments/comments.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post!: Post;
  @Input() displayComments: boolean = true;

  sourceImage!: string;

  currentUser!: User;
  ownerExists!: boolean;
  postOwner!: User;

  constructor(
    private router: Router,
    private postService: PostService,
    private authService: AuthenticationService,
    private http: HttpClient
    ) {

  }

  ngOnInit(): void {
    this.ownerExists = false;
    this.postOwner = new User;
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    if(this.post.userId > 0){
      this.ownerExists = true;
      this.postService.getPostOwner(this.post.userId).subscribe(postOwner => {
        this.postOwner = postOwner;
      });
    }    
  }

  createImagePath(src: string){
    return `https://localhost:44347/${src}`
  }

  onDelete() {
    this.postService.deletePost(this.post.id).subscribe();
    console.log(this.post.id);
    //window.location.reload();
  }
}
