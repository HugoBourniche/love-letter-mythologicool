import {LoveLetterPlayerData} from "../../objects/data/game/players/love-letter-player.data";
import {APlayersGame} from "./a-players.game";
import {LoveLetterOtherPlayerGame} from "./love-letter-other-player.game";
import {LoveLetterCurrentPlayerGame} from "./love-letter-current-player.game";
import {LoveLetterPlayerGame} from "./love-letter-player-game";

export class LoveLetterPlayersGame extends APlayersGame<LoveLetterPlayerData, LoveLetterPlayerGame> {

    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor(context: Phaser.Scene, width: number, height: number, players: LoveLetterPlayerData[], currentPlayer: LoveLetterPlayerData) {
        super(context, width, height, players, currentPlayer);
    }

    // *****************************************************************************************************************
    // IMPLEMENTATIONS
    // *****************************************************************************************************************

    protected override initPlayersOnCanvas(): void {
        this._currentPlayerObject = new LoveLetterCurrentPlayerGame(this._context, this._width / 6, (this._height / 6) * 4, this._currentPlayer);
        const nbPlayers = this._players.length;
        const range = this._width / nbPlayers;
        for(let i = 0; i < this._players.length; i++) {
            this._playersObject.push(
                new LoveLetterOtherPlayerGame(this._context, i*range + (range/2), this._height / 6, this._players[i])
            );
        }
    }

}