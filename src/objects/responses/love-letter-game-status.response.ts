import {LoverLetterGameManagerDTO} from "../dtos/game/managers/lover-letter-game-manager.dto";

export class LoveLetterGameStatusResponse {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private readonly _gameManagerDTO: LoverLetterGameManagerDTO;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(
    gameManagerDTO: LoverLetterGameManagerDTO,
  ) {
    this._gameManagerDTO = gameManagerDTO;
  }

  // *****************************************************************************************************************
  // GETTER
  // *****************************************************************************************************************

  get gameManagerDTO(): LoverLetterGameManagerDTO {
    return this._gameManagerDTO;
  }

}
