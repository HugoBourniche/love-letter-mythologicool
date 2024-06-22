import {LoveLetterPlayerData} from "../../objects/data/game/players/love-letter-player.data";
import {LoveLetterCardGame} from "../cards/love-letter-card.game";
import {LoveLetterPlayerGame} from "./love-letter-player-game";

export class LoveLetterOtherPlayerGame extends LoveLetterPlayerGame {

    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    // INPUTS
    // OBJECTS

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor(context: Phaser.Scene, positionX: number, positionY: number, player: LoveLetterPlayerData) {
        super(context, positionX, positionY, player);
    }


    // *****************************************************************************************************************
    // PRIVATE METHODS
    // *****************************************************************************************************************

    protected override initCards() {
        for (let i = 0; i < this._player.hand.length; i++) {
            const cardData = this._player.hand[i];
            const cardObject = new LoveLetterCardGame(this._context, this._positionX + 40 * i, this._positionY, cardData);
            this._cardObjects.push(cardObject);
        }
    }

    // *****************************************************************************************************************
    // OVERRIDE METHODS
    // *****************************************************************************************************************

    public override clear() {
        super.clear();
    }
}