import { SimpleLabelField } from "../forms/simple-label.field";
import { Scene } from "phaser";
import { DEFAULT_STYLE_WHITE } from "../../cst";
import { APlayerData } from "../../objects/data/game/players/a-player-data";
import { SimpleField } from "../forms/simple.field";

export abstract class APlayerGame<P extends APlayerData> extends SimpleField {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUT
  protected _player: P;

  // OBJECTS
  protected _text: SimpleLabelField;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  protected constructor(
    context: Scene,
    positionX: number,
    positionY: number,
    player: P
  ) {
    super(context, positionX, positionY);
    this._player = player;
    this._text = new SimpleLabelField(
      context,
      positionX -
        player.user.name.length * (player.user.name.length > 5 ? 25 : 32),
      positionY,
      player.user.name,
      DEFAULT_STYLE_WHITE
    );
  }

  // *****************************************************************************************************************
  // OVERRIDE METHODS
  // *****************************************************************************************************************

  public override clear() {
    this._text.clear();
  }
}
