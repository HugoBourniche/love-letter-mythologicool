import { SimpleLabelObject } from "../simple-label.object";
import { Scene } from "phaser";
import { DEFAULT_STYLE_WHITE } from "../../cst";
import { APlayerData } from "../../objects/data/game/players/a-player-data";
import { PositionedSceneObject } from "../positioned-scene.object";

export abstract class APlayerObject<
  P extends APlayerData
> extends PositionedSceneObject {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUT
  protected _player: P;

  // OBJECTS
  protected _text: SimpleLabelObject;

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
    this._text = new SimpleLabelObject(
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
