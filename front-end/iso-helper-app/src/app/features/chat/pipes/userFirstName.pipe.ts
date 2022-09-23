import { Pipe, PipeTransform } from "@angular/core";
import { User } from "@core/authentication/models/user.model";

@Pipe({'name': 'userFirstNamePipe'})
export class UserFirstNamePipe implements PipeTransform{
    transform (users: User[], firstName: string): User[]{
        if(firstName == "") return users;
        return users.filter(user => user.firstName == firstName);
    }
}