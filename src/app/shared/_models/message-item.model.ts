import { User } from "../_interfaces/user/user.model";

export class MessageItem {
    constructor(
        public id: number,
        public userName: string,
        public messageName: string,
        public created: Date,
    ){}  
}