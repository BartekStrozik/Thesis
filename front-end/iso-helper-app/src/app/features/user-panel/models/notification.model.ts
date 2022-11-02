export class Notification {
    id: number;
    ownerId: number;
    sourceUserId: number;
    sourceUserSrc: string;
    sourceFirstName: string;
    sourceLastName: string;
    isNewMessage: number;
    isNewComment: number;
    postId: number;
    isNewInvite: number;

    constructor(id: number, ownerId: number, sourceUserId: number, sourceUserSrc: string, sourceFirstName: string, sourceLastName: string, isNewMessage: number, isNewComment: number, postId: number, isNewInvite: number){
        this.id = id;
        this.ownerId = ownerId;
        this.sourceUserId = sourceUserId;
        this.sourceUserSrc = sourceUserSrc;
        this.sourceFirstName = sourceFirstName;
        this.sourceLastName = sourceLastName;
        this.isNewMessage = isNewMessage;
        this.isNewComment = isNewComment;
        this.postId = postId;
        this.isNewInvite = isNewInvite;
    }
}