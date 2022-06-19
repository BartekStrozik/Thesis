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
  display: boolean = false;

  comments: CommentsInterface[] = [];

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.commentsService.getCommentsForPost(this.postId).subscribe(comments => {
      console.log("==========================")
      console.log(comments);
      console.log("==========================")
      this.comments = comments;
      this.display = this.comments.length > 0;
    })
  }

  addComment(comment: CommentsInterface): void {
    this.commentsService.addComment(comment).subscribe();
  }

}
