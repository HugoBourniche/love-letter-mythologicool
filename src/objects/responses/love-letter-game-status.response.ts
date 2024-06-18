import { LoverLetterGameManagerDTO } from "../dtos/game/managers/lover-letter-game-manager.dto";
import { LoveLetterPlayerDTO } from "../dtos/game/players/love-letter-player.dto";

export class LoveLetterGameStatusResponse {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private readonly _gameManagerDTO: LoverLetterGameManagerDTO;
  private readonly _playerDTO: LoveLetterPlayerDTO;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(
    gameManagerDTO: LoverLetterGameManagerDTO,
    playerDTO: LoveLetterPlayerDTO
  ) {
    this._gameManagerDTO = gameManagerDTO;
    this._playerDTO = playerDTO;
  }

  // *****************************************************************************************************************
  // GETTER
  // *****************************************************************************************************************

  get gameManagerDTO(): LoverLetterGameManagerDTO {
    return this._gameManagerDTO;
  }

  get playerDTO(): LoveLetterPlayerDTO {
    return this._playerDTO;
  }
}
