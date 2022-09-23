export class UsersFilters {
    firstName: string;
    lastName: string;
    place: string;

    constructor(firstName: string, lastName: string, place: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.place = place;
    }
}