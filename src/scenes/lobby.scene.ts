import {PreloadService} from "../services/preload.service";
import {ServicesFactory} from "../utils/factories/services.factory";
import {LobbyData} from "../objects/data/lobby.data";
import {LabelledButtonField} from "../gameobjects/forms/buttons/labelled-button.field";
import {GameOptionData} from "../objects/data/game-option.data";
import {LobbyUserData} from "../objects/data/users/lobby-user.data";
import {SimpleLabelField} from "../gameobjects/forms/simple-label.field";
import {DEFAULT_FONT_SIZE} from "../cst";
import {LobbyUserField} from "../gameobjects/forms/lobby-user.field";
import {LobbyService} from "../services/lobby.service";

export default class LobbyScene extends Phaser.Scene {

    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    // Services
    private _preloadService: PreloadService;
    private _lobbyService: LobbyService;

    // Objects
    private _startButton?: LabelledButtonField;
    private _lobbyKeyLabel?: SimpleLabelField;
    private _lobbyData: LobbyData;
    private _playerLabels: LobbyUserField[];

    // Utils
    private timeStamp = 0;

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor() {
        super("lobby-scene");
        this._preloadService = ServicesFactory.Preload(this);
        this._lobbyService = ServicesFactory.Lobby();
        this._lobbyData = {} as LobbyData;
        this._playerLabels = [];
    }

    // *****************************************************************************************************************
    // PHASER LIFECYCLE
    // *****************************************************************************************************************

    init(lobbyData: LobbyData) {
        console.log("Init lobby scene");
        if (lobbyData.key === undefined) {
            lobbyData = new LobbyData("FAB-IEN", [new LobbyUserData("Théo", true, true), new LobbyUserData("Mélanie", false, false), new LobbyUserData("Thomas", true, false), new LobbyUserData("Hugo", false, false)], new GameOptionData(6));
        }
        console.log(lobbyData);
        this._lobbyData = lobbyData;
    }

    preload() {
        console.log("Preload lobby scene");
        this._preloadService.loadMainMenuImages();
    }

    create() {
        console.log("Create lobby scene");
        this._startButton = new LabelledButtonField(this, 400, 50, "Start", () => this.startGame());
        this._lobbyKeyLabel = new SimpleLabelField(this, 24, 40, "Lobby: " + this._lobbyData.key, {color: "#ffffff", fontSize: DEFAULT_FONT_SIZE});
        this.refreshUsers();

    }

    update(time: number, delta: number) {
        super.update(time, delta);

        const timeSpent = time - this.timeStamp;
        if (timeSpent >= 5000) { // Every 5s
            this.timeStamp = time;
            this._lobbyService.updateLobby(this._lobbyData.key).then(
                (updatedLobbyData) => this.updateLobbyData(updatedLobbyData.lobby)
            )
        }
    }

    // *****************************************************************************************************************
    // PRIVATE METHODS
    // *****************************************************************************************************************

    private startGame() {
        console.log("Start Game");
    }

    private updateLobbyData(updatedLobbyData: LobbyData) {
        this._lobbyData = updatedLobbyData;
        this.refreshUsers();
    }

    private refreshUsers() {
        for (const playerLabel of this._playerLabels) {
            playerLabel.clear();
        }

        for (let i = 0; i < this._lobbyData.users.length; i++) {
            const user = this._lobbyData.users[i];
            this._playerLabels.push(new LobbyUserField(this, 50, 150 + i*50, user, {color: "#ffffff", fontSize: DEFAULT_FONT_SIZE}));
        }
    }
}