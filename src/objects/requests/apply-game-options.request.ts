import { GameOptionsDTO } from "../dtos/game-options/game-options.dto";

export class ApplyGameOptionsRequest {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private lobbyKey: string;
  private gameOptions: GameOptionsDTO;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(lobbyKey: string, gameOptions: GameOptionsDTO) {
    this.lobbyKey = lobbyKey;
    this.gameOptions = gameOptions;
  }
}
