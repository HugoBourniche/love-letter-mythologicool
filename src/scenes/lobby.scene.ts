import { PreloadService } from "../services/preload.service";
import { ServicesFactory } from "../utils/factories/services.factory";
import { LobbyData } from "../objects/data/lobby.data";
import { LabelledButtonField } from "../gameobjects/forms/buttons/labelled-button.field";
import { LobbyUserData } from "../objects/data/users/lobby-user.data";
import { SimpleLabelField } from "../gameobjects/forms/simple-label.field";
import { DEFAULT_FONT_SIZE } from "../cst";
import { LobbyUserField } from "../gameobjects/forms/lobby-user.field";
import { LobbyService } from "../services/lobby.service";
import { PartScenePositionsEnum } from "../utils/factories/part-scene-positions.enum";
import { DataFactory } from "../utils/factories/data.factory";
import { DtoToDataConverter } from "../utils/converters/dto-to-data.converter";
import { GameOptionsPanel } from "./panel/game-options.panel";
import { LobbySceneData } from "../objects/data/lobby-scene.data";
import { StoneLabelledButtonField } from "../gameobjects/forms/buttons/stone-labelled-button.field";
import { MainSceneData } from "../objects/data/main-scene.data";
import { GameManagerService } from "../services/game-manager.service";
import { LoveLetterInitializationGameResponse } from "../objects/responses/love-letter-initialization-game.response";
import { LobbyUpdateResponse } from "../objects/responses/lobby-update.response";

export default class LobbyScene extends Phaser.Scene {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // Services
  private _preloadService: PreloadService;
  private _lobbyService: LobbyService;
  private _gameManagerService: GameManagerService;

  // Scene panel
  private _gameOptionsPanel: GameOptionsPanel;

  // Objects
  private _startButton?: LabelledButtonField;
  private _lobbyKeyLabel?: SimpleLabelField;
  private _lobbyData: LobbyData;
  private _playerLabels: LobbyUserField[];

  // Utils
  private _currentUser: LobbyUserData;
  private timeStamp = 0;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor() {
    super("lobby-scene");
    this._preloadService = ServicesFactory.Preload(this);
    this._lobbyService = ServicesFactory.Lobby();
    this._gameManagerService = ServicesFactory.GameManager();
    this._gameOptionsPanel = new GameOptionsPanel(this);
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
      lobbyData = DataFactory.defaultLobbyData();
    }
    this._lobbyData = lobbyData;
    this._currentUser = lobbyData.fetchUser(lobbySceneData.currentUserName);
    this._gameOptionsPanel.init(
      lobbyData.key,
      this._currentUser.isOwner,
      lobbyData.options,
      PartScenePositionsEnum.MID_RIGHT
    );
  }

  preload() {
    console.log("Preload lobby scene");
    this._preloadService.loadMainMenuImages();
    this._gameOptionsPanel.preload();
  }

  create() {
    console.log("Create lobby scene");
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

  update(time: number, delta: number) {
    super.update(time, delta);

    const timeSpent = time - this.timeStamp;
    if (timeSpent >= 5000) {
      // Every 5s
      this.timeStamp = time;
      this._lobbyService
        .updateLobby(this._lobbyData.key)
        .then((updatedLobbyData) =>
          this.updateLobbyData(DtoToDataConverter.lobby(updatedLobbyData.lobby))
        );
    }
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
    console.log("Start Game");
    this._gameManagerService
      .initializeGame(this._lobbyData.key)
      .then((response: LoveLetterInitializationGameResponse) => {
        console.log(response);
        this.scene.start(
          "main-scene",
          new MainSceneData(this._lobbyData, this._currentUser.name)
        );
      });
  }

  private updateLobbyData(updatedLobbyData: LobbyData) {
    this._currentUser = updatedLobbyData.fetchUser(this._currentUser.name);
    this._lobbyData = updatedLobbyData;
    this._gameOptionsPanel.refresh(updatedLobbyData.options);
    this.refreshButton();
    this.refreshUsers();
  }

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
