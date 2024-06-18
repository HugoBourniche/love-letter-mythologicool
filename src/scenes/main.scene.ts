import Phaser from "phaser";
import { DealerService } from "../services/dealer.service";
import { ZoneService } from "../services/zone.service";
import { PreloadService } from "../services/preload.service";
import Zone from "../objects/zone";
import { ServicesFactory } from "../utils/factories/services.factory";
import { MainSceneData } from "../objects/data/main-scene.data";
import { GameManagerService } from "../services/game-manager.service";
import { LoveLetterGameManagerData } from "../objects/data/game/managers/love-letter-game-manager.data";
import { LoveLetterPlayerData } from "../objects/data/game/love-letter-player.data";
import { LoveLetterGameStatusResponse } from "../objects/responses/love-letter-game-status.response";
import { DtoToDataConverter } from "../utils/converters/dto-to-data.converter";
import {DataFactory} from "../utils/factories/data.factory";

export default class MainScene extends Phaser.Scene {
  private text: Phaser.GameObjects.Text | undefined;
  private zone: Zone | undefined;

  private dealerService: DealerService;
  private zoneService: ZoneService;
  private preloadService: PreloadService;
  private _gameManagerService: GameManagerService;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor() {
    super("main-scene");
    this.dealerService = new DealerService(this);
    this.zoneService = new ZoneService();
    this.preloadService = ServicesFactory.Preload(this);
    this._gameManagerService = ServicesFactory.GameManager();
  }

  // *****************************************************************************************************************
  // PHASER LIFECYCLE
  // *****************************************************************************************************************

  init(mainSceneData: MainSceneData) {
    console.log(mainSceneData);
    if (mainSceneData.lobbyKey === undefined || mainSceneData.currentUserName === undefined) {
      console.log("Use default data");
      mainSceneData = DataFactory.defaultMainSceneData();
    }
    this._gameManagerService
      .gameStatus(mainSceneData.lobbyKey, mainSceneData.currentUserName)
      .then((response: LoveLetterGameStatusResponse) =>
        this.onGameStatus(
          DtoToDataConverter.loveLetterGameManager(response.gameManagerDTO),
          DtoToDataConverter.loveLetterPlayer(response.playerDTO)
        )
      );
  }

  preload() {
    this.preloadService.loadBaseImages();
  }

  create() {
    const self = this;
    this.text = this.add
      .text(75, 350, ["DEAL CARDS"])
      .setFontSize(18)
      .setFontFamily("Trebuchet MS")
      .setColor("#00ffff")
      .setInteractive();
    this.text.on("pointerover", function () {
      self.text?.setColor("#ff69b4");
    });
    this.text.on("pointerout", function () {
      self.text?.setColor("#00ffff");
    });

    this.input.on(
      "drag",
      (
        pointer: Phaser.Input.Pointer,
        gameObject: any,
        dragX: number,
        dragY: number
      ) => this.handleDrag(pointer, gameObject, dragX, dragY)
    );

    this.zone = new Zone(this);
    this.zone.renderZone();
    this.zone.renderOutline();

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

  update(time: number, delta: number) {}

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

  // EVENTS

  private onGameStatus(
    gameManager: LoveLetterGameManagerData,
    player: LoveLetterPlayerData
  ) {
    console.log(gameManager);
    console.log(player);
  }
}
