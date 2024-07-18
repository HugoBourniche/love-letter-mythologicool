import { GameOptionsData } from "../../objects/data/game-options/game-options.data";
import { ScenePartPanelPositionsEnum } from "../../utils/Factories/scene-part-panel-positions.enum";
import { SimpleLabelGameObject } from "../../gameobjects/simple-label.game-object";
import { DEFAULT_STYLE_WHITE } from "../../cst";
import { SelectorGameObject } from "../../gameobjects/forms/selector.game-object";
import { StoneLabelledButtonGameObject } from "../../gameobjects/forms/buttons/stone-labelled-button.game-object";
import { LobbyService } from "../../services/lobby.service";
import { ServicesFactory } from "../../utils/factories/services.factory";
import { AScenePart } from "./a.scene-part";

export class GameOptionsScenePart extends AScenePart {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // Services
  private lobbyService: LobbyService;

  // INPUTS

  // OBJECTS
  private _gameOptions?: GameOptionsData;
  private _title?: SimpleLabelGameObject;
  private _playerMax?: SelectorGameObject;
  private _applyButton?: StoneLabelledButtonGameObject;

  // VARIABLES
  private _lobbyKey?: string;
  private _isUserOwner?: boolean;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(context: Phaser.Scene) {
    super(context);
    this.lobbyService = ServicesFactory.Lobby();
  }

  // *****************************************************************************************************************
  // PHASER LIFE CYCLE
  // *****************************************************************************************************************

  public init(
    lobbyKey: string,
    isUserOwner: boolean,
    gameOptions: GameOptionsData,
    position: ScenePartPanelPositionsEnum
  ) {
    super.baseInit(position);
    this._lobbyKey = lobbyKey;
    this._isUserOwner = isUserOwner;
    this._gameOptions = gameOptions;
  }

  public preload() {
  }

  public create() {
    if (this._box == null || this._gameOptions == null) {
      return;
    }
    this._context.add.rectangle(
      this._box.midWidth,
      this._box.midHeight,
      this._box.width,
      this._box.height,
      0x222222
    );
    this._title = new SimpleLabelGameObject(
      this._context,
      this._box.x(50),
      this._box.y(20),
      "Game Options",
      DEFAULT_STYLE_WHITE
    );
    this._playerMax = new SelectorGameObject(
      this._context,
      this._box.x(100),
      this._box.y(60),
      "Number of players",
      this._gameOptions.ranges.nbPlayersChoices,
      DEFAULT_STYLE_WHITE
    );
    this._applyButton = new StoneLabelledButtonGameObject(
      this._context,
      this._box.midWidth,
      this._box.y(150),
      "Apply options",
      () => this.applyOptions()
    );
    this._playerMax.refresh(this._gameOptions.maxPlayers);
    this.isDisabled(!this._isUserOwner); // Disable fields for non-owner-user
  }

  public update() {}

  public refresh(gameOptions: GameOptionsData) {
    if (this._isUserOwner) {
      return;
    }
    this._playerMax?.refresh(gameOptions.maxPlayers);
  }

  // *****************************************************************************************************************
  // PRIVATE METHODS
  // *****************************************************************************************************************

  private applyOptions() {
    console.log("Apply options");
    if (this._gameOptions == null || this._lobbyKey == null) {
      return;
    }
    this._gameOptions.maxPlayers = this._playerMax
      ? Number.parseInt(this._playerMax.value())
      : -1;
    this.lobbyService
      .applyGameOptions(this._lobbyKey, this._gameOptions)
      .then();
  }

  private isDisabled(disabled: boolean) {
    this._playerMax?.setDisable(disabled);
    this._applyButton?.setDisable(disabled);
  }
}
