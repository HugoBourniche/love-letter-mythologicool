import {LoveLetterPlayerData} from "../../objects/data/game/players/love-letter-player.data";
import {APlayerGame} from "./a-player.game";

export class LoveLetterPlayerGame extends APlayerGame<LoveLetterPlayerData> {

    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************


    constructor(context: Phaser.Scene, positionX: number, positionY: number, player: LoveLetterPlayerData) {
        super(context, positionX, positionY, player);
    }
}