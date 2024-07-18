import Phaser from "phaser";
import { DealerService } from "../services/dealer.service";
import { ZoneService } from "../services/zone.service";
import { PreloadService } from "../services/preload.service";
import { ServicesFactory } from "../utils/factories/services.factory";
import { GameManagerService } from "../services/game-manager.service";
import { LoveLetterPlayerData } from "../objects/data/game/players/love-letter-player.data";
import { LoveLetterGameStatusResponse } from "../objects/responses/love-letter-game-status.response";
import { DtoToDataConverter } from "../utils/converters/dto-to-data.converter";
import { DataFactory } from "../utils/factories/data.factory";
import { LoveLetterGameManagerData } from "../objects/data/game/managers/love-letter-game-manager.data";
import { MainSceneData } from "../objects/data/main-scene.data";
import { GAME_RATE } from "../cst";
import { BaseCustomScene } from "./base-custom.scene";
import { LoveLetterPlayersContainerGame } from "../gameobjects/players/love-letter-players-container.game";
import { LoveLetterCardData } from "../objects/data/game/cards/love-letter-card.data";
import { SimpleLabelField } from "../gameobjects/forms/simple-label.field";
import { LoveLetterCardStacksContainerGame } from "../gameobjects/stack/love-letter-card-stacks-container.game";

export default class MainScene extends BaseCustomScene {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // Services
  private dealerService: DealerService;
  private zoneService: ZoneService;
  private _preloadService: PreloadService;
  private _gameManagerService: GameManagerService;

  // Game Objects
  private _playersContainerObject?: LoveLetterPlayersContainerGame;
  private _cardStacksContainerObject?: LoveLetterCardStacksContainerGame;
  private _requestedActions?: SimpleLabelField;

  // Data Objects
  private _mainSceneData?: MainSceneData;
  private _gameManagerData?: LoveLetterGameManagerData;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor() {
    super("main-scene");
    this.dealerService = new DealerService(this);
    this.zoneService = new ZoneService();
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
    const self = this;
    this.input.on(
      "drag",
      (
        pointer: Phaser.Input.Pointer,
        gameObject: any,
        dragX: number,
        dragY: number
      ) => this.handleDrag(pointer, gameObject, dragX, dragY)
    );

    this.input.on(
      "dragstart",
      function (pointer: Phaser.Input.Pointer, gameObject: any) {
        gameObject.setTint(0xff69b4);
        self.children.bringToTop(gameObject);
      }
    );

    this.input.on(
      "dragend",
      function (
        pointer: Phaser.Input.Pointer,
        gameObject: any,
        dropped: boolean
      ) {
        // Drop not in zone
        gameObject.setTint();
        if (!dropped) {
          gameObject.x = gameObject.input.dragStartX;
          gameObject.y = gameObject.input.dragStartY;
        }
      }
    );

    this.input.on(
      "drop",
      function (
        pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.Image,
        dropZone: Phaser.GameObjects.Zone
      ) {
        // Drop in zone
        dropZone.data.values.cards++;
        gameObject.x = dropZone.x - 350 + dropZone.data.values.cards * 50;
        gameObject.y = dropZone.y;
        gameObject.disableInteractive();
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

  private handleDrag(
    pointer: Phaser.Input.Pointer,
    gameObject: any,
    dragX: number,
    dragY: number
  ) {
    gameObject.x = dragX;
    gameObject.y = dragY;
  }

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
    if (this._playersContainerObject == null) {
      this.createPlayersContainerObject(gameManager.players);
    }
    if (this._cardStacksContainerObject == null) {
      this.createCardStacksContainerObject(
        gameManager.cardPile,
        gameManager.discardPile,
        gameManager.asidePile
      );
    }
  }

  private createCardStacksContainerObject(
    cardStackPile: LoveLetterCardData[],
    cardStackDiscard: LoveLetterCardData[],
    cardStackAside: LoveLetterCardData[]
  ) {
    this._cardStacksContainerObject = new LoveLetterCardStacksContainerGame(
      this,
      660,
      500,
      cardStackPile,
      cardStackDiscard,
      cardStackAside
    );
  }

  private createPlayersContainerObject(players: LoveLetterPlayerData[]) {
    if (this._gameManagerData?.currentPlayer == null) {
      return;
    }
    this._playersContainerObject = new LoveLetterPlayersContainerGame(
      this,
      this.game.config.width as number,
      this.game.config.height as number,
      players,
      this._gameManagerData?.currentPlayer
    );
  }
}
