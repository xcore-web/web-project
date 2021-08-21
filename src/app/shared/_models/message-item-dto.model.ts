export class MessageItemDto {
    constructor(
        public id: number,
        public userName: string,
        public messageName: string,
        public created: Date,
        public comments: MessageItemDto[]
    ) {}
}