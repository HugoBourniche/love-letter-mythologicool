import {LobbyUserData} from "./users/lobby-user.data";
import {GameOptionsData} from "./game-options/game-options.data";

export class LobbyData {

    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    private _key: string;
    private _users: LobbyUserData[];
    private _options: GameOptionsData;

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor() {
        this._key = "";
        this._users = [];
        this._options = new GameOptionsData();
    }

    // *****************************************************************************************************************
    // PUBLIC METHODS
    // *****************************************************************************************************************

    public isEmpty() {
        return this._key === null && this._users === null && this._options === null;
    }

    public fetchUser(username: string): LobbyUserData {
        const user = this._users.filter(u => u.name == username);
        if (user.length == 0) {
            throw new Error(username + " does not exists");
        }
        return user[0];
    }

    // *****************************************************************************************************************
    // GETTER / SETTER
    // *****************************************************************************************************************

    get key(): string {
        return this._key;
    }

    set key(value: string) {
        this._key = value;
    }

    get owner(): LobbyUserData {
        return this._users.filter((user) => user.isOwner)[0];
    }

    get users(): LobbyUserData[] {
        return this._users;
    }

    set users(value: LobbyUserData[]) {
        this._users = value;
    }

    get options(): GameOptionsData {
        return this._options;
    }

    set options(value: GameOptionsData) {
        this._options = value;
    }
}