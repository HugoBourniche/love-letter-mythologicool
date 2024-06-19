import {Scene} from "phaser";
import {APlayerData} from "../../objects/data/game/players/a-player-data";
import {APlayerGame} from "./a-player.game";

export abstract class APlayersGame<P extends APlayerData, G extends APlayerGame<P>> {
    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    // INPUTS
    protected _context: Scene;
    protected _width: number;
    protected _height: number;
    protected _players: P[];
    protected _currentPlayer: P;

    // OBJECTS
    protected _playersObject: G[];


    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor(
        context: Scene,
        width: number,
        height: number,
        players: P[],
        currentPlayer: P
    ) {
        this._context = context;
        this._width = width;
        this._height = height;
        this._players = players;
        this._playersObject = [];
        this._currentPlayer = currentPlayer;
        this.initPlayersOnCanvas();
    }

    // *****************************************************************************************************************
    // PUBLIC METHODS
    // *****************************************************************************************************************

    protected abstract initPlayersOnCanvas(): void;


}