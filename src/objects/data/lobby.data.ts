import {LobbyUserData} from "./users/lobby-user.data";
import {GameOptionData} from "./gameoptions/game-option.data";

export class LobbyData {

    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    private _key: string;
    private _users: LobbyUserData[];
    private _options: GameOptionData;

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor(key: string, users: LobbyUserData[], options: GameOptionData) {
        this._key = key;
        this._users = users;
        this._options = options;
    }

    // *****************************************************************************************************************
    // PUBLIC METHODS
    // *****************************************************************************************************************

    public isEmpty() {
        return this._key === null && this._users === null && this._options === null;
    }
    // *****************************************************************************************************************
    // GETTER
    // *****************************************************************************************************************

    get key(): string {
        return this._key;
    }

    get owner(): LobbyUserData {
        return this._users.filter((user) => user.isOwner)[0];
    }

    get users(): LobbyUserData[] {
        return this._users;
    }

    get options(): GameOptionData {
        return this._options;
    }
}