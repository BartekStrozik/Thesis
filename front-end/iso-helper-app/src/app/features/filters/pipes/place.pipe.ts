import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "@features/post/models/post.model";

@Pipe({'name': 'placePipe'})
export class PlacePipe implements PipeTransform{
    transform (posts: Post[], keyowrd: string): Post[]{
        if(keyowrd == "") return posts;
        return posts.filter(post => post.place.includes(keyowrd));
    }
}