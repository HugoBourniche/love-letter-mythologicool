import {LobbyData} from "../data/lobby.data";

export class LobbyCreationResponse {

    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    private readonly _lobby: LobbyData;
    private readonly _currentUserName: string;

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor(lobby: LobbyData, currentUserName: string) {
        this._lobby = lobby;
        this._currentUserName = currentUserName;
    }

    // *****************************************************************************************************************
    // GETTER
    // *****************************************************************************************************************

    get lobby(): LobbyData {
        return this._lobby;
    }

    get currentUserName(): string {
        return this._currentUserName;
    }
}