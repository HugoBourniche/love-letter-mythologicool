import { SimpleLabelField } from "../forms/simple-label.field";
import { Scene } from "phaser";
import { DEFAULT_STYLE_WHITE } from "../../cst";
import {APlayerData} from "../../objects/data/game/players/a-player-data";

export abstract class APlayerGame<P extends APlayerData> {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUT
  private _context: Scene;
  private _player: P;

  // OBJECTS
  private text: SimpleLabelField;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(
    context: Scene,
    positionX: number,
    positionY: number,
    player: P
  ) {
    this._context = context;
    this._player = player;
    this.text = new SimpleLabelField(
      context,
      positionX,
      positionY,
      player.user.name,
      DEFAULT_STYLE_WHITE
    );
  }

  // *****************************************************************************************************************
  // PUBLIC METHODS
  // *****************************************************************************************************************
}
