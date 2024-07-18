import { SimpleLabelGameObject } from "../simple-label.game-object";
import { Scene } from "phaser";
import { DEFAULT_STYLE_WHITE } from "../../cst";
import { APlayerData } from "../../objects/data/game/players/a-player-data";
import { PositionedSceneGameObject } from "../positioned-scene.game-object";

export abstract class APlayerGameObject<
  P extends APlayerData
> extends PositionedSceneGameObject {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUT
  protected _player: P;

  // OBJECTS
  protected _text: SimpleLabelGameObject;

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
    this._text = new SimpleLabelGameObject(
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
