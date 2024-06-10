import {GameOptionData} from "../data/gameoptions/game-option.data";

export class ApplyGameOptionsRequest {

    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    private lobbyKey: string;
    private gameOptions: GameOptionData;

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor(lobbyKey: string, gameOptions: GameOptionData) {
        this.lobbyKey = lobbyKey;
        this.gameOptions = gameOptions;
    }
}