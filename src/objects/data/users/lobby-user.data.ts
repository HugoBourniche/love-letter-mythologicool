import {UserData} from "./user.data";

export class LobbyUserData extends UserData {

    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    private _isReady: boolean;
    private _isOwner: boolean;

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor(name: string, isReady: boolean, isOwner: boolean) {
        super(name);
        this._isReady = isReady;
        this._isOwner = isOwner;
    }

    // *****************************************************************************************************************
    // GETTER
    // *****************************************************************************************************************

    get isReady(): boolean {
        return this._isReady;
    }

    get isOwner(): boolean {
        return this._isOwner;
    }

}