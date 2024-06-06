import Phaser from "phaser";
import {PreloadService} from "../services/preload.service";
import {TextInputField} from "../gameobjects/forms/TextInputField";
import {JoinLobbyButton} from "../gameobjects/forms/buttons/JoinLobbyButton";
import {CreateLobbyButton} from "../gameobjects/forms/buttons/CreateLobbyButton";
import {ServicesFactory} from "../utils/factories/services.factory";
import {LobbyService} from "../services/lobby.service";


export default class MainMenuScene extends Phaser.Scene {

    // Services
    private _preloadService: PreloadService;
    private _lobbyService: LobbyService;

    // Attributes
    private _inputField?: TextInputField;
    private _joinButton?: JoinLobbyButton;
    private _createButton?: CreateLobbyButton;

    constructor() {
        super();
        this._preloadService = ServicesFactory.Preload(this);
        this._lobbyService = ServicesFactory.Lobby();
    }

    preload() {
        this._preloadService.loadMainMenuImages();
    }

    create() {
        console.log("Create main menu");

        this.input.keyboard?.createCursorKeys();

        // Initiate form and input field
        const nameTextConfig = { fontSize: '23px', fill: '#000000'};
        this._inputField = new TextInputField(this, 550, 200, "Enter your name...", nameTextConfig);
        this._createButton = new CreateLobbyButton(this, 550, 300, "Create lobby", nameTextConfig, this._inputField.value());
        this._joinButton = new JoinLobbyButton(this, 550, 400, "Join lobby", nameTextConfig);
    }

    update() {
        this._inputField?.update();
    }

    private startgame() {
        console.log("Start game with " + this._inputField?.value());

        this.cameras.main.fadeOut(1000);
        this.cameras.main.shake(1000, .0030, false);
    }

    private animateButton(button: any) {
        button.on('pointerover', () => button.setTexture("buttonHover"));
        button.on('pointerover', () => button.setTexture("button"));
    }

}