import { AGameManagerDTO } from "./a-game-manager.dto";
import { LoveLetterPlayerDTO } from "../players/love-letter-player.dto";
import { LoveLetterCardDTO } from "../cards/love-letter-card.dto";
import { LoveLetterRequestedActionDTO } from "../actions/loveletter-requested-action.dto";

export class LoverLetterGameManagerDTO extends AGameManagerDTO<
  LoveLetterPlayerDTO,
  LoveLetterRequestedActionDTO
> {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  public cardPile: LoveLetterCardDTO[];
  public discardPile: LoveLetterCardDTO[];
  public asideCard: LoveLetterCardDTO[];
  public playerTurn: number;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor() {
    super();
    this.cardPile = [];
    this.discardPile = [];
    this.asideCard = [];
    this.playerTurn = -1;
  }
}
