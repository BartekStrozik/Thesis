import { Pipe, PipeTransform } from "@angular/core";
import { User } from "@core/authentication/models/user.model";

@Pipe({'name': 'userPlacePipe'})
export class UserPlacePipe implements PipeTransform{
    transform (users: User[], place: string): User[]{
        if(place == "") return users;
        return users.filter(user => user.place == place);
    }
}