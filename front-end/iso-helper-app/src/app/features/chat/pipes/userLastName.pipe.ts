import { Pipe, PipeTransform } from "@angular/core";
import { User } from "@core/authentication/models/user.model";

@Pipe({'name': 'userLastNamePipe'})
export class UserLastNamePipe implements PipeTransform{
    transform (users: User[], lastName: string): User[]{
        if(lastName == "") return users;
        return users.filter(user => user.lastName == lastName);
    }
}