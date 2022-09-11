import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "@features/post/models/post.model";

@Pipe({'name': 'placePipe'})
export class PlacePipe implements PipeTransform{
    transform (posts: Post[], place: string): Post[]{
        if(place == "") return posts;
        return posts.filter(post => post.place == place);
    }
}