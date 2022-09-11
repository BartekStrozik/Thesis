import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "@features/post/models/post.model";

@Pipe({'name': 'userPipe'})
export class UserPipe implements PipeTransform{
    transform (posts: Post[], user: string): Post[]{
        if(user == "") return posts;
        //nowe zapytanie do bazy
        return posts.filter(post => post.userId > 0);
    }
}