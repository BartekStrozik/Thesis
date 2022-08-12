import { Component, OnInit } from '@angular/core';
import { CommentsInterface } from '@features/comments/models/comments.interafce';
import { CommentsService } from '@features/comments/services/comments.service';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.scss']
})
export class AllCommentsComponent implements OnInit {
  comments: CommentsInterface[] = [];

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentsService.getComments().subscribe(comments => {
      this.comments = comments;
    })
  }

}
