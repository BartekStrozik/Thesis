export class Friends {
    id: number;
    userId: number;
    invitedId: number;
    accepted: number;

    constructor(id: number, userId: number, invitedId: number, accepted: number){
        this.id = id;
        this.userId = userId;
        this.invitedId = invitedId;
        this.accepted = accepted;
    }
}