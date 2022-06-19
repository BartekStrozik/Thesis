import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@core/authentication/models/user.model'
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { Post } from '@features/post/models/post.model';
import { PostService } from '@features/post/services/post.service';
import { CommentsComponent } from '@features/comments/components/comments/comments.component';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post!: Post;
  currentUser!: User;
  ownerExists!: boolean;
  postOwner!: User;

  constructor(
    private router: Router,
    private postService: PostService,
    private authService: AuthenticationService
    ) {

  }

  ngOnInit(): void {
    this.ownerExists = false;
    this.postOwner = new User;
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    if(this.post.UserId > 0){
      this.ownerExists = true;
      this.postService.getPostOwner(this.post.UserId).subscribe(postOwner => {
        this.postOwner = postOwner;
      });
    }
  }

  onDelete() {
    this.postService.deletePost(this.post.Id).subscribe();
    console.log(this.post.Id);
    //window.location.reload();
  }
}
