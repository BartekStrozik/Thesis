import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { Post } from '@features/post/models/post.model';
import { PostService } from '@features/post/services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm = new FormGroup({
    Topic: new FormControl(),
    Content: new FormControl(),
    Src: new FormControl()
  })

  constructor(
    private postService: PostService,
    private authService: AuthenticationService
    ) { }

  ngOnInit(): void {
  }

  get f() { return this.postForm.controls; }

  onSubmit() {
    let post: Post = this.postForm.value;
    let currentUser = this.authService.currentUserValue;
    if(currentUser.id > 0) post.UserId = currentUser.id;
    this.postService.addPost(post).subscribe();
  }
}
