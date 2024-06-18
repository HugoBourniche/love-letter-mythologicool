import { LobbyUserDTO } from "./users/lobby-user.dto";
import { GameOptionsDTO } from "./game/options/game-options.dto";

export class LobbyDTO {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  public key: string;
  public users: LobbyUserDTO[];
  public options: GameOptionsDTO;
  public inGame: boolean;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor() {
    this.key = "";
    this.users = [];
    this.options = new GameOptionsDTO();
    this.inGame = false;
  }
}
