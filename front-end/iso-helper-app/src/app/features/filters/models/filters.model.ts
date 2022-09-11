export class Filters {
    topic: string;
    user: string;
    place: string;

    constructor(topic: string, user: string, place: string) {
        this.topic = topic;
        this.user = user;
        this.place = place;
    }
}