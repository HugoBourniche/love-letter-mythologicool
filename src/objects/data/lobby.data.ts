import {UserData} from "./users/user.data";
import {LobbyUserData} from "./users/lobby-user.data";
import {GameOptionData} from "./game-option.data";

export class LobbyData {

    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    private key: string;
    private owner: UserData;
    private users: LobbyUserData[];
    private options: GameOptionData;

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor(key: string, owner: UserData, users: LobbyUserData[], options: GameOptionData) {
        this.key = key;
        this.owner = owner;
        this.users = users;
        this.options = options;
    }
}