import { HttpClient, HttpEventType } from '@angular/common/http';
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
    Place: new FormControl(),
    Topic: new FormControl(),
    Content: new FormControl()
  })

  selectedFile!: File;
  uploadFinished!: any;

  constructor(
    private postService: PostService,
    private http: HttpClient,
    private authService: AuthenticationService,
    private route: ActivatedRoute, private router: Router
  ) { }

  ngOnInit(): void {
  }

  get f() { return this.postForm.controls; }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmit() {
    let post: Post = {
      "id": 0,
      "content": this.postForm.value.Content,
      "topic": this.postForm.value.Topic,
      "place": this.postForm.value.Place,
      "date": "dd/mm/yyyy",
      "userId": 0,
      "src": ""
    };

    const filedata = new FormData();
    filedata.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('https://localhost:44347/api/Upload', filedata, { observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.Response){
          this.uploadFinished = event.body;
          post.src = this.uploadFinished.dbPath;
          
          post.date = Date.now().toString();

          let currentUser = this.authService.currentUserValue;
          if (currentUser.id > 0) {
            post.userId = currentUser.id;
            post.place = currentUser.place;
          }
          this.postService.addPost(post).subscribe();
          this.router.navigate(['/']);
        }
    });
  }
}
