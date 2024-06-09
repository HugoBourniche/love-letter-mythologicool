import Phaser from "phaser";
import {PreloadService} from "../services/preload.service";
import {TextInputField} from "../gameobjects/forms/text-input.field";
import {ServicesFactory} from "../utils/factories/services.factory";
import {LobbyService} from "../services/lobby.service";
import {LabelledButtonField} from "../gameobjects/forms/buttons/labelled-button.field";
import {LobbyData} from "../objects/data/lobby.data";
import {LobbyCreationResponse} from "../objects/responses/lobby-creation.response";


export default class MainMenuScene extends Phaser.Scene {

    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    // Services
    private _preloadService: PreloadService;
    private _lobbyService: LobbyService;

    // Objects
    private _inputField?: TextInputField;
    private _joinButton?: LabelledButtonField;
    private _createButton?: LabelledButtonField;

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
        this._inputField = new TextInputField(this, 550, 200, "Enter your name...");
        this._createButton = new LabelledButtonField(this, 550, 300, "Create lobby", () => this.createLobby());
        this._joinButton = new LabelledButtonField(this, 550, 400, "Join lobby", () => this.joinLobby());
    }

    update() {
        this._inputField?.update();
    }

    // *****************************************************************************************************************
    // PRIVATE METHODS
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
        this.scene.start("lobby-scene", lobbyData);
    }

}