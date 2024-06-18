import { APlayerDTO } from "./a-player.dto";
import { LoveLetterCardDTO } from "../cards/love-letter-card.dto";

export class LoveLetterPlayerDTO extends APlayerDTO {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  public hand: LoveLetterCardDTO[];
  public position: number;
  public nbFavorPeace: number;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor() {
    super();
    this.hand = [];
    this.position = -1;
    this.nbFavorPeace = 0;
  }
}
