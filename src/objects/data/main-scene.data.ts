import { LobbyData } from "./lobby.data";
import { GameOptionsData } from "./game-options/game-options.data";
import { UserData } from "./users/user.data";

export class MainSceneData {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private readonly _lobbyKey: string;
  private readonly _gameOptions: GameOptionsData;
  private readonly _users: UserData[];
  private readonly _currentUserName: string;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(lobbyData: LobbyData, currentUser: string) {
    this._lobbyKey = lobbyData.key;
    this._gameOptions = lobbyData.options;
    this._users = lobbyData.users;
    this._currentUserName = currentUser;
  }

  // *****************************************************************************************************************
  // GETTER
  // *****************************************************************************************************************

  get lobbyKey(): string {
    return this._lobbyKey;
  }

  get gameOptions(): GameOptionsData {
    return this._gameOptions;
  }

  get users(): UserData[] {
    return this._users;
  }

  get currentUserName(): string {
    return this._currentUserName;
  }
}
