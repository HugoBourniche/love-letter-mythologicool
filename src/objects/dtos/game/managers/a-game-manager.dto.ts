import { APlayerDTO } from "../players/a-player.dto";
import { ARequestedActionDTO } from "../actions/a-requested-action.dto";

export abstract class AGameManagerDTO<
  P extends APlayerDTO,
  A extends ARequestedActionDTO
> {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  public currentPlayer?: P;
  public otherPlayers: P[];
  public requestedAction?: A;
  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  protected constructor() {
    this.otherPlayers = [];
  }
}
