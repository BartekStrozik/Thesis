export class Post {
    id: number;
    topic: string;
    content: string;
    src: string;
    userId: number;
    place: string;
    date: string;

    constructor(id: number, topic: string, content: string, src: string, userId: number, place: string, date: string) {
        this.id = id;
        this.topic = topic;
        this.content = content;
        this.src = src;
        this.userId = userId;
        this.place = place;
        this.date = date;
    }
}