export class Message {
    id: number;
    senderId: number;
    receiverId: number;
    content: string;
    receivedAt: string;

    constructor(id: number, senderId: number, receiverId: number, content: string, receivedAt: string) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
        this.receivedAt = receivedAt;
    }
}