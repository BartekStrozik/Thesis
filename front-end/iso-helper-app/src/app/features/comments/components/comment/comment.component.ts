import { Component, Input, OnInit } from '@angular/core';
import { CommentsInterface } from '@features/comments/models/comments.interafce';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment!: CommentsInterface;

  constructor() { }

  ngOnInit(): void {
  }

}
