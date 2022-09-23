import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "@features/post/models/post.model";

@Pipe({'name': 'topicPipe'})
export class TopicPipe implements PipeTransform{
    transform (posts: Post[], keyword: string): Post[]{
        if(keyword == "") return posts;
        return posts.filter(post => post.topic.includes(keyword));
    }
}