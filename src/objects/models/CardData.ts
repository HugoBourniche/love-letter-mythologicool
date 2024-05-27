
export class CardData {

    private id: string;
    private name: string;
    private sprintId: string;
    private value: number;
    private facingDown: boolean;

    constructor(id: string, name: string, sprintId: string, value: number, facingDown: boolean) {
        this.id = id;
        this.name = name;
        this.sprintId = sprintId;
        this.value = value;
        this.facingDown = facingDown;
    }
}