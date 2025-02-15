import { Scene } from "phaser";
import { DEFAULT_STYLE } from "../../../utils/constants/cst";
import { LabelledButtonGameObject } from "./labelled-button.game-object";

export class StoneLabelledButtonGameObject extends LabelledButtonGameObject {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(
    context: Scene,
    positionX: number,
    positionY: number,
    label: string,
    action: () => void,
    style: Phaser.Types.GameObjects.Text.TextStyle = DEFAULT_STYLE
  ) {
    super(context, positionX, positionY, label, action, "stone_", style);

    this._image.setScale(1.2, 0.6);
  }

  // *****************************************************************************************************************
  // PUBLIC METHOD
  // *****************************************************************************************************************

  public clear() {
    super.clear();
  }

  // *****************************************************************************************************************
  // PRIVATE METHOD
  // *****************************************************************************************************************
}
