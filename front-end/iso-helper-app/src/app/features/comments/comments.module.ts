import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CommentComponent } from './components/comment/comment.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AllCommentsComponent } from './components/all-comments/all-comments.component';

@NgModule({
  declarations: [
    CommentComponent,
    CommentFormComponent,
    CommentsComponent,
    AllCommentsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    CommentComponent,
    CommentFormComponent,
    CommentsComponent
  ]
})
export class CommentsModule { }
