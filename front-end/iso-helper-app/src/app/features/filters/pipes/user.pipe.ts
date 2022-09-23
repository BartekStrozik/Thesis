import { Pipe, PipeTransform } from "@angular/core";
import { User } from "@core/authentication/models/user.model";
import { Post } from "@features/post/models/post.model";

@Pipe({'name': 'userPipe'})
export class UserPipe implements PipeTransform{
    transform (posts: Post[], userIds: User[]): Post[]{
        if(userIds.length == 0) return posts;
        let resultPosts: Post[] = [];
        userIds.forEach(user => {
            resultPosts = [...resultPosts, ...posts.filter(post => post.userId == user.id)];
        })
        return resultPosts;
    }
}