import { LobbyDTO } from "../dtos/lobby.dto";

export class LobbyCreationResponse {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private readonly _lobby: LobbyDTO;
  private readonly _currentUserName: string;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(lobby: LobbyDTO, currentUserName: string) {
    this._lobby = lobby;
  this._currentUserName = currentUserName;
  }

  // *****************************************************************************************************************
  // GETTER
  // *****************************************************************************************************************

  get lobby(): LobbyDTO {
    return this._lobby;
  }

  get currentUserName(): string {
    return this._currentUserName;
  }
}
