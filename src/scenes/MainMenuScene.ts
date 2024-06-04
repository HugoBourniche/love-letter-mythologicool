import Phaser from "phaser";
import {PreloadService} from "../services/preload.service";
import {TextInputField} from "../objects/forms/TextInputField";


export default class MainMenuScene extends Phaser.Scene {

    // Services
    private preloadService: PreloadService;

    // Attributes
    inputField: TextInputField;

    constructor() {
        super();
        this.preloadService = new PreloadService(this);
    }

    preload() {
        this.preloadService.loadMainMenuImages();
    }

    create() {
        console.log("Create main menu");

        this.add.image(0, 0, "background");
        // const style = new TextStyle();
        const text = this.add.text(0, 0, "Menu");
        text.setColor("#ffff00");

        this.input.keyboard?.createCursorKeys();

        // Initiate form and input field
        const nameTextConfig = { fontSize: '23px', fill: '#000000'};
        this.inputField = new TextInputField(this, 420, 200, "Enter your name", nameTextConfig);

    }

    update() {
        this.inputField.update();
    }

    private startgame() {
        console.log("Start game with " + this.inputField.value());

        this.cameras.main.fadeOut(1000);
        this.cameras.main.shake(1000, .0030, false);
    }

    private animateButton(button: any) {
        button.on('pointerover', () => button.setTexture("buttonHover"));
        button.on('pointerover', () => button.setTexture("button"));
    }

}