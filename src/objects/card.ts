
export default class Card {

    private context: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.context = scene;
    }

    public render(x: number, y: number, sprite: string) {
        const card = this.context.add.image(x, y, sprite).setScale(0.3, 0.3).setInteractive();
        this.context.input.setDraggable(card);
        return card;
    }
}