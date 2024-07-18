import { PreloadService } from "../services/preload.service";
import { ServicesFactory } from "../utils/factories/services.factory";
import { LobbyData } from "../objects/data/lobby.data";
import { LabelledButtonField } from "../gameobjects/forms/buttons/labelled-button.field";
import { LobbyUserData } from "../objects/data/users/lobby-user.data";
import { SimpleLabelField } from "../gameobjects/forms/simple-label.field";
import { DEFAULT_FONT_SIZE, LOBBY_RATE } from "../cst";
import { LobbyUserField } from "../gameobjects/forms/lobby-user.field";
import { LobbyService } from "../services/lobby.service";
import { ScenePartPanelPositionsEnum } from "../utils/Factories/scene-part-panel-positions.enum";
import { DataFactory } from "../utils/factories/data.factory";
import { DtoToDataConverter } from "../utils/converters/dto-to-data.converter";
import { GameOptionsScenePart } from "./panel/game-options.scene-part";
import { LobbySceneData } from "../objects/data/lobby-scene.data";
import { StoneLabelledButtonField } from "../gameobjects/forms/buttons/stone-labelled-button.field";
import { MainSceneData } from "../objects/data/main-scene.data";
import { GameManagerService } from "../services/game-manager.service";
import { LobbyUpdateResponse } from "../objects/responses/lobby-update.response";
import { BaseCustomScene } from "./base-custom.scene";

export default class LobbyScene extends BaseCustomScene {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // Services
  private _preloadService: PreloadService;
  private _lobbyService: LobbyService;
  private _gameManagerService: GameManagerService;

  // Scene panel
  private _gameOptionsPanel: GameOptionsScenePart;

  // Objects
  private _startButton?: LabelledButtonField;
  private _lobbyKeyLabel?: SimpleLabelField;
  private _lobbyData: LobbyData;
  private _playerLabels: LobbyUserField[];

  // Utils
  private _currentUser: LobbyUserData;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor() {
    super("lobby-scene");
    this._preloadService = ServicesFactory.Preload(this);
    this._lobbyService = ServicesFactory.Lobby();
    this._gameManagerService = ServicesFactory.GameManager();
    this._gameOptionsPanel = new GameOptionsScenePart(this);
    this._lobbyData = {} as LobbyData;
    this._playerLabels = [];
    this._currentUser = new LobbyUserData();
  }

  // *****************************************************************************************************************
  // PHASER LIFECYCLE
  // *****************************************************************************************************************

  init(lobbySceneData: LobbySceneData) {
    console.log("Init lobby scene");
    let lobbyData = lobbySceneData.lobbyData;
    if (lobbyData.key === undefined) {
      console.log("Use default data");
      lobbyData = DataFactory.defaultLobbyData();
    }
    this._lobbyData = lobbyData;
    this._currentUser = lobbyData.fetchUser(lobbySceneData.currentUserName);
    this._gameOptionsPanel.init(
      lobbyData.key,
      this._currentUser.isOwner,
      lobbyData.options,
      ScenePartPanelPositionsEnum.MID_RIGHT
    );
  }

  preload() {
    this._preloadService.loadMainMenuImages();
    this._preloadService.loadLoveLetterClassicPresetImages();
    this._gameOptionsPanel.preload();
  }

  create() {
    this._startButton = new StoneLabelledButtonField(
      this,
      400,
      50,
      this._currentUser.isOwner
        ? "Start"
        : this._currentUser.isReady
        ? "Ready"
        : "Not ready",
      () => (this._currentUser.isOwner ? this.startGame() : this.isReady())
    );
    this._lobbyKeyLabel = new SimpleLabelField(
      this,
      24,
      40,
      "Lobby: " + this._lobbyData.key,
      { color: "#ffffff", fontSize: DEFAULT_FONT_SIZE }
    );
    this.refreshUsers();
    this._gameOptionsPanel.create();
  }

  // UPDATE

  update(time: number, delta: number) {
    super.update(time, delta);
  }

  onUpdate(): void {
    this._lobbyService
      .updateLobby(this._lobbyData.key)
      .then((updatedLobbyData) =>
        this.onUpdateLobby(DtoToDataConverter.lobby(updatedLobbyData.lobby))
      );
  }

  get updateRate(): number {
    return LOBBY_RATE;
  }

  // *****************************************************************************************************************
  // PRIVATE METHODS
  // *****************************************************************************************************************

  private isReady() {
    this._lobbyService
      .switchUserReady(this._lobbyData.key, this._currentUser.name)
      .then((response: LobbyUpdateResponse) =>
        this.updateLobbyData(DtoToDataConverter.lobby(response.lobby))
      );
  }

  private startGame() {
    this._gameManagerService
      .initializeGame(this._lobbyData.key)
      .then(() => this.onGameStarted());
  }

  private updateLobbyData(updatedLobbyData: LobbyData) {
    this._currentUser = updatedLobbyData.fetchUser(this._currentUser.name);
    this._lobbyData = updatedLobbyData;
    this._gameOptionsPanel.refresh(updatedLobbyData.options);
    this.refreshButton();
    this.refreshUsers();
  }

  // Events

  private onUpdateLobby(lobby: LobbyData) {
    if (lobby.isInGame) {
      this.onGameStarted();
    } else {
      this.updateLobbyData(lobby);
    }
  }

  private onGameStarted() {
    this.scene.start(
      "main-scene",
      new MainSceneData(this._lobbyData.key, this._currentUser.name)
    );
  }

  // Refresh

  private refreshButton() {
    if (!this._currentUser.isOwner) {
      this._startButton?.refreshLabel(
        this._currentUser.isReady ? "Ready" : "Not ready"
      );
    }
  }

  private refreshUsers() {
    for (const playerLabel of this._playerLabels) {
      playerLabel.clear();
    }

    for (let i = 0; i < this._lobbyData.users.length; i++) {
      const user = this._lobbyData.users[i];
      this._playerLabels.push(
        new LobbyUserField(this, 50, 150 + i * 50, user, {
          color: "#ffffff",
          fontSize: DEFAULT_FONT_SIZE,
        })
      );
    }
  }
}
