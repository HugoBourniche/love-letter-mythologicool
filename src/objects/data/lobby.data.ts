import {UserData} from "./users/user.data";
import {LobbyUserData} from "./users/lobby-user.data";
import {GameOptionData} from "./game-option.data";

export class LobbyData {

    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    private _key: string;
    private _owner: UserData;
    private _users: LobbyUserData[];
    private _options: GameOptionData;

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor(key: string, owner: UserData, users: LobbyUserData[], options: GameOptionData) {
        this._key = key;
        this._owner = owner;
        this._users = users;
        this._options = options;
    }

    // *****************************************************************************************************************
    // GETTER
    // *****************************************************************************************************************

    get key(): string {
        return this._key;
    }

    get owner(): UserData {
        return this._owner;
    }

    get users(): LobbyUserData[] {
        return this._users;
    }

    get options(): GameOptionData {
        return this._options;
    }
}