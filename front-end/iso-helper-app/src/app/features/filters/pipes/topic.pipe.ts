import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "@features/post/models/post.model";

@Pipe({'name': 'topicPipe'})
export class TopicPipe implements PipeTransform{
    transform (posts: Post[], topic: string): Post[]{
        if(topic == "") return posts;
        return posts.filter(post => post.topic.includes(topic));
    }
}