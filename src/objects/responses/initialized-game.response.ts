import { GameManagerData } from "../data/game/game-manager.data";

export class InitializedGameResponse {
  private gameManagerDTO: GameManagerData;

  constructor(gameManagerDTO: GameManagerData) {
    this.gameManagerDTO = gameManagerDTO;
  }
}
