import Phaser from "phaser";


export default class MainScene extends Phaser.Scene {


    private image: Phaser.GameObjects.Image;

    constructor() {
        super("main-scene");
    }

    preload() {
        this.load.setBaseURL("./assets/");
        this.load.image('cardBack', 'images/cards/card_back.png');
        this.load.image('cardFront1', 'images/cards/card_1_front.png');
        this.load.image('cardFront2', 'images/cards/card_2_front.png');
        this.load.image('cardFront3', 'images/cards/card_3_front.png');
        this.load.image('cardFront4', 'images/cards/card_4_front.png');
    }

    create() {
        this.add.text(75, 350,['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
        this.image = this.add.image(300, 300, 'cardFront1').setScale(0.5, 0.5).setInteractive();
        this.input.setDraggable(this.image);

        this.input.on('drag', (pointer: any, gameObject: any, dragX: any, dragY: any) => this.handleDrag(pointer, gameObject, dragX, dragY));
    }

    update(time: number, delta: number) {

    }

    handleDrag(pointer: any, gameObject: { x: any; y: any; }, dragX: any, dragY: any) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    }

}