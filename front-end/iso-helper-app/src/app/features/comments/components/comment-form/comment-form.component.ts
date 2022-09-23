import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentsInterface } from '@features/comments/models/comments.interafce'
import { AuthenticationService } from '@core/authentication/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  @Input() hasCancelButton!: boolean;
  @Input() initialText: string = "";
  content!: string;
  @Input() postId: number = 0;

  @Output() handleSubmit = new EventEmitter<CommentsInterface>();

  form!: FormGroup;

  constructor(private fb: FormBuilder, 
    private route: ActivatedRoute, private router: Router,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      body: [this.initialText]

    });
  }

  onSubmit(): void {
    let comment: CommentsInterface = this.form.value;
    comment.postId = this.postId;

    this.content = "";

    let currentUserId = this.authService.currentUserValue.id 
    if(currentUserId > 0) comment.userId = currentUserId;
    else comment.userId = 0;
    
    this.handleSubmit.emit(comment);
  }

}
