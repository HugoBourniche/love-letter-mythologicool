import { PreloadService } from "../services/preload.service";
import { ServicesFactory } from "../utils/factories/services.factory";
import { GameManagerService } from "../services/game-manager.service";
import { LoveLetterGameStatusResponse } from "../objects/responses/love-letter-game-status.response";
import { DtoToDataConverter } from "../utils/converters/dto-to-data.converter";
import { DataFactory } from "../utils/factories/data.factory";
import { LoveLetterGameManagerData } from "../objects/data/game/managers/love-letter-game-manager.data";
import { MainSceneData } from "../objects/data/main-scene.data";
import { GAME_RATE } from "../utils/constants/cst";
import { BaseCustomScene } from "./base-custom.scene";
import { LoveLetterPlayersContainerGameObject } from "../gameobjects/players/love-letter-players-container.game-object";
import { LoveLetterCardStacksContainerGameObject } from "../gameobjects/stack/love-letter-card-stacks-container.game-object";
import { LoveLetterRequestedActionGameObject } from "../gameobjects/actions/love-letter-requested-action.game-object";
import {
  GAME_OBJECT_POSITION_X_CARD_STACKS_CONTAINER,
  GAME_OBJECT_POSITION_X_REQUESTED_ACTION,
  GAME_OBJECT_POSITION_X_ROUND_NUMBER,
  GAME_OBJECT_POSITION_Y_CARD_STACKS_CONTAINER,
  GAME_OBJECT_POSITION_Y_REQUESTED_ACTION,
  GAME_OBJECT_POSITION_Y_ROUND_NUMBER,
} from "../utils/constants/positions.cst";
import { RoundNumberLabelGameObject } from "../gameobjects/round-number-label.game-object";
import Pointer = Phaser.Input.Pointer;
import Transform = Phaser.GameObjects.Components.Transform;

export default class MainScene extends BaseCustomScene {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // Services
  private _preloadService: PreloadService;
  private _gameManagerService: GameManagerService;

  // Game Objects
  private _playersContainerObject?: LoveLetterPlayersContainerGameObject;
  private _cardStacksContainerObject?: LoveLetterCardStacksContainerGameObject;
  private _requestedActionsObject?: LoveLetterRequestedActionGameObject;
  private _roundNumberObject?: RoundNumberLabelGameObject;

  // Data Objects
  private _mainSceneData?: MainSceneData;
  private _gameManagerData?: LoveLetterGameManagerData;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor() {
    super("main-scene");
    this._preloadService = ServicesFactory.Preload(this);
    this._gameManagerService = ServicesFactory.GameManager();
  }

  // *****************************************************************************************************************
  // PHASER LIFECYCLE
  // *****************************************************************************************************************

  init(mainSceneData: MainSceneData) {
    if (
      mainSceneData.lobbyKey === undefined ||
      mainSceneData.currentUserName === undefined
    ) {
      console.log("Use default data");
      mainSceneData = DataFactory.defaultMainSceneData();
    }
    this._mainSceneData = mainSceneData;
  }

  preload() {
    this._preloadService.loadBaseImages();
    this._preloadService.loadLoveLetterClassicPresetImages();
  }

  create() {
    this.updateGameStatus(); // Used in update
    this.input.on(
      "drag",
      (
        pointer: Pointer,
        gameObject: Transform,
        dragX: number,
        dragY: number
      ) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
      }
    );
  }

  // UPDATE

  update(time: number, delta: number) {
    super.update(time, delta);
  }

  onUpdate(): void {
    // this.updateGameStatus(); // TODO Update
  }

  get updateRate(): number {
    return GAME_RATE;
  }

  // *****************************************************************************************************************
  // PRIVATE METHODS
  // *****************************************************************************************************************

  private updateGameStatus() {
    if (this._mainSceneData == null) {
      throw Error("No main scene data");
    }
    this._gameManagerService
      .gameStatus(
        this._mainSceneData.lobbyKey,
        this._mainSceneData.currentUserName
      )
      .then((response: LoveLetterGameStatusResponse) =>
        this.onGameStatus(
          DtoToDataConverter.loveLetterGameManager(response.gameManagerDTO)
        )
      );
  }

  // EVENTS

  private onGameStatus(gameManager: LoveLetterGameManagerData) {
    this._gameManagerData = gameManager;
    if (!gameManager.currentPlayer) {
      throw Error("Current player does not exists");
    }

    if (this._playersContainerObject == null) {
      this._playersContainerObject = new LoveLetterPlayersContainerGameObject(
        this,
        this.game.config.width as number,
        this.game.config.height as number,
        gameManager.players,
        gameManager.currentPlayer
      );
    }

    if (this._roundNumberObject == null) {
      this._roundNumberObject = new RoundNumberLabelGameObject(
        this,
        GAME_OBJECT_POSITION_X_ROUND_NUMBER,
        GAME_OBJECT_POSITION_Y_ROUND_NUMBER,
        gameManager.roundNumber
      );
    }

    if (this._cardStacksContainerObject == null) {
      this._cardStacksContainerObject =
        new LoveLetterCardStacksContainerGameObject(
          this,
          GAME_OBJECT_POSITION_X_CARD_STACKS_CONTAINER,
          GAME_OBJECT_POSITION_Y_CARD_STACKS_CONTAINER,
          gameManager.cardPile,
          gameManager.discardPile,
          gameManager.asidePile
        );
    }

    if (
      this._requestedActionsObject == null &&
      gameManager.requestedAction &&
      gameManager.currentPlayer
    ) {
      this._requestedActionsObject = new LoveLetterRequestedActionGameObject(
        this,
        GAME_OBJECT_POSITION_X_REQUESTED_ACTION,
        GAME_OBJECT_POSITION_Y_REQUESTED_ACTION,
        gameManager.requestedAction,
        gameManager.currentPlayer.user.name
      );
    }
  }
}
