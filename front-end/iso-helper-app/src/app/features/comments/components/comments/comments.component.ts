import { Component, Input, OnInit } from '@angular/core';

import { CommentsInterface } from '@features/comments/models/comments.interafce';
import { CommentsService } from '@features/comments/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() postId!: number;
  @Input() display!: boolean;

  comments: CommentsInterface[] = [];

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentsService.getCommentsForPost(this.postId).subscribe(comments => {
      this.comments = comments;
      if(this.comments.length == 0) this.display = false;
    })

    //this.commentsService.getComments().subscribe(comments => {
    //  this.comments = comments;
    //})
  }

  addComment(comment: CommentsInterface): void {
    this.commentsService.addComment(comment).subscribe();
  }

}
