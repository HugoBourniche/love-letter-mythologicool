import { LobbyService } from "../../services/lobby.service";
import { PreloadService } from "../../services/preload.service";

export class ServicesFactory {
  // *****************************************************************************************************************
  // SERVICES
  // *****************************************************************************************************************

  private static _lobbyService: LobbyService;
  private static _preloadService: PreloadService;

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
}
