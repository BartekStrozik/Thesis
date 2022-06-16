export class Post {
    Id: number;
    Topic: string;
    Content: string;
    Src: string;
    UserId: number;

    constructor(Id: number, Topic: string, Content: string, Src: string, UserId: number) {
        this.Id = Id;
        this.Topic = Topic;
        this.Content = Content;
        this.Src = Src;
        this.UserId = UserId;
    }
}