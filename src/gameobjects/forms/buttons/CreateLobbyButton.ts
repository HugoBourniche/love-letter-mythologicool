import {AButton} from "./AButton";
import {LobbyService} from "../../../services/lobby.service";
import {ServicesFactory} from "../../../utils/factories/services.factory";

export class CreateLobbyButton extends AButton {

    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    // Services
    private _lobbyService: LobbyService;
    private _username: string;

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor(context: Phaser.Scene, positionX: number, positionY: number, label: string, style: Phaser.Types.GameObjects.Text.TextStyle, username: string) {
        super(context, positionX, positionY, label, style);
        this._username = username;
        this._lobbyService = ServicesFactory.Lobby();
    }

    // *****************************************************************************************************************
    // PUBLIC METHOD
    // *****************************************************************************************************************

    onClick() {
        console.log("create lobby click");
        console.log(this._username);
        this._lobbyService.createLobby(this._username).then(
            (lobby) => {
                console.log(lobby);
            }
        );
    }

    // *****************************************************************************************************************
    // PRIVATE METHOD
    // *****************************************************************************************************************

}