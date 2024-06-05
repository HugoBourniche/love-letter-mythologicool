import Phaser from "phaser";
import {PreloadService} from "../services/preload.service";
import {TextInputField} from "../objects/forms/TextInputField";
import {JoinLobbyButton} from "../objects/forms/buttons/JoinLobbyButton";


export default class MainMenuScene extends Phaser.Scene {

    // Services
    private _preloadService: PreloadService;

    // Attributes
    private _inputField: TextInputField;
    private _joinButton: JoinLobbyButton;

    constructor() {
        super();
        this._preloadService = new PreloadService(this);
    }

    preload() {
        this._preloadService.loadMainMenuImages();
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
        this._inputField = new TextInputField(this, 420, 200, "Enter your name", nameTextConfig);
        this._joinButton = new JoinLobbyButton(this, 550, 400, "Join", nameTextConfig);
    }

    update() {
        this._inputField.update();
    }

    private startgame() {
        console.log("Start game with " + this._inputField.value());

        this.cameras.main.fadeOut(1000);
        this.cameras.main.shake(1000, .0030, false);
    }

    private animateButton(button: any) {
        button.on('pointerover', () => button.setTexture("buttonHover"));
        button.on('pointerover', () => button.setTexture("button"));
    }

}