import Phaser from "phaser";
import {PreloadService} from "../services/preload.service";
import {TextInputField} from "../gameobjects/forms/text-input-field";
import {ServicesFactory} from "../utils/factories/services.factory";
import {LobbyService} from "../services/lobby.service";
import {LabelledButton} from "../gameobjects/forms/buttons/labelled-button";
import {LobbyData} from "../objects/data/lobby.data";
import {LobbyCreationResponse} from "../objects/responses/lobby-creation.response";


export default class MainMenuScene extends Phaser.Scene {

    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    // Services
    private _preloadService: PreloadService;
    private _lobbyService: LobbyService;

    // Attributes
    private _inputField?: TextInputField;
    private _joinButton?: LabelledButton;
    private _createButton?: LabelledButton;

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor() {
        super("main-menu-scene");
        this._preloadService = ServicesFactory.Preload(this);
        this._lobbyService = ServicesFactory.Lobby();
    }

    // *****************************************************************************************************************
    // PHASER LIFECYCLE
    // *****************************************************************************************************************

    preload() {
        this._preloadService.loadMainMenuImages();
    }

    create() {
        console.log("Create main menu");

        this.input.keyboard?.createCursorKeys();

        // Initiate form and input field
        const nameTextConfig = { fontSize: '23px', fill: '#000000'};
        this._inputField = new TextInputField(this, 550, 200, "Enter your name...", nameTextConfig);
        this._createButton = new LabelledButton(this, 550, 300, "Create lobby", nameTextConfig, () => this.createLobby());
        this._joinButton = new LabelledButton(this, 550, 400, "Join lobby", nameTextConfig, () => this.joinLobby());
    }

    update() {
        this._inputField?.update();
    }

    // *****************************************************************************************************************
    // PUBLIC METHODS
    // *****************************************************************************************************************

    // Button events

    private createLobby() {
        if (this._inputField == null) {
            console.error("_inputField is null");
            return;
        }
        this._lobbyService.createLobby(this._inputField.value()).then(
            (response: LobbyCreationResponse) => this.onLobbyCreated(response.lobby)
        ).catch(
            (error) => console.error(error)
        );
    }

    private joinLobby() {
        console.log("Join lobby");
    }

    private onLobbyCreated(lobbyData: LobbyData) {
        console.log("Key: " + lobbyData.key);
        this.scene.switch("main-scene");
    }

}