import { GameOptionsData } from "../../objects/data/game-options/game-options.data";
import { BoxSizes } from "../../gameobjects/box-sizes";
import { PartSceneFactory } from "../../utils/factories/part-scene.factory";
import { PartScenePositionsEnum } from "../../utils/factories/part-scene-positions.enum";
import { SimpleLabelField } from "../../gameobjects/forms/simple-label.field";
import { DEFAULT_STYLE_WHITE } from "../../cst";
import { SelectorField } from "../../gameobjects/forms/selector.field";
import { StoneLabelledButtonField } from "../../gameobjects/forms/buttons/stone-labelled-button.field";
import { LobbyService } from "../../services/lobby.service";
import { ServicesFactory } from "../../utils/factories/services.factory";

export class GameOptionsPanel {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // Services
  private lobbyService: LobbyService;

  // INPUTS
  private _context: Phaser.Scene;

  // OBJECTS
  private _box?: BoxSizes;
  private _gameOptions?: GameOptionsData;
  private _title?: SimpleLabelField;
  private _playerMax?: SelectorField;
  private _applyButton?: StoneLabelledButtonField;

  // VARIABLES
  private _lobbyKey?: string;
  private _isUserOwner?: boolean;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(context: Phaser.Scene) {
    this._context = context;
    this.lobbyService = ServicesFactory.Lobby();
  }

  // *****************************************************************************************************************
  // PHASER LIFE CYCLE
  // *****************************************************************************************************************

  public init(
    lobbyKey: string,
    isUserOwner: boolean,
    gameOptions: GameOptionsData,
    position: PartScenePositionsEnum
  ) {
    this._lobbyKey = lobbyKey;
    this._isUserOwner = isUserOwner;
    this._gameOptions = gameOptions;
    this._box = PartSceneFactory.computeBoxSizes(
      position,
      this._context.game.config.width as number,
      this._context.game.config.height as number
    );
  }

  public preload() {}

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
    this._title = new SimpleLabelField(
      this._context,
      this._box.x(50),
      this._box.y(20),
      "Game Options",
      DEFAULT_STYLE_WHITE
    );
    this._playerMax = new SelectorField(
      this._context,
      this._box.x(100),
      this._box.y(60),
      "Number of players",
      this._gameOptions.ranges.nbPlayersChoices,
      DEFAULT_STYLE_WHITE
    );
    this._applyButton = new StoneLabelledButtonField(
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
