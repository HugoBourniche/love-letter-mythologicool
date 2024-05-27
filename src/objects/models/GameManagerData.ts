import {CardData} from "./CardData";
import {PlayerData} from "./PlayerData";

export class GameManagerData {

    private playerTurn: number;
    private players: PlayerData[];
    private cardPile: CardData[];
    private discardPile: CardData[];
    private asidePile: CardData[];

    constructor(playerTurn: number, players: PlayerData[], cardPile: CardData[], discardPile: CardData[], asidePile: CardData[]) {
        this.playerTurn = playerTurn;
        this.players = players;
        this.cardPile = cardPile;
        this.discardPile = discardPile;
        this.asidePile = asidePile;
    }
}