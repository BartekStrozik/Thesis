import { Component, Input, OnInit } from '@angular/core';
import { CommentsInterface } from '@features/comments/models/comments.interafce';
import { UserService } from '@features/user-panel/services/user.service';
import { User } from '@core/authentication/models/user.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment!: CommentsInterface;
  userData!: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserData(this.comment.userId).subscribe(user => {
      this.userData = user;
      console.log(this.userData);
    })
  }

  createImagePath(src: string){
    return `https://localhost:44347/${src}`
  }

}
