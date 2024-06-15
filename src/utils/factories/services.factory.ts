import { LobbyService } from "../../services/lobby.service";
import { PreloadService } from "../../services/preload.service";
import { GameManagerService } from "../../services/game-manager.service";

export class ServicesFactory {
  // *****************************************************************************************************************
  // SERVICES
  // *****************************************************************************************************************

  private static _lobbyService: LobbyService;
  private static _preloadService: PreloadService;
  private static _gameManagerService: GameManagerService;

  // *****************************************************************************************************************
  // GETTERS
  // *****************************************************************************************************************

  public static Lobby(): LobbyService {
    if (this._lobbyService == null) {
      this._lobbyService = new LobbyService();
    }
    return this._lobbyService;
  }

  public static Preload(context: Phaser.Scene): PreloadService {
    if (this._preloadService == null) {
      this._preloadService = new PreloadService(context);
    }
    return this._preloadService;
  }

  public static GameManager(): GameManagerService {
    if (this._gameManagerService == null) {
      this._gameManagerService = new GameManagerService();
    }
    return this._gameManagerService;
  }
}
