import {GameOptionRangeData} from "./game-option-range.data";

export class GameOptionData {

    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    private _maxPlayers: number;
    private readonly _ranges: GameOptionRangeData;

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor(maxPlayers: number, gameOptionRange: GameOptionRangeData) {
        this._maxPlayers = maxPlayers;
        this._ranges = gameOptionRange;
    }

    // *****************************************************************************************************************
    // GETTER / SETTER
    // *****************************************************************************************************************

    get maxPlayers(): number {
        return this._maxPlayers;
    }

    set maxPlayers(value: number) {
        this._maxPlayers = value;
    }

    get ranges(): GameOptionRangeData {
        return this._ranges;
    }
}