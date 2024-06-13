import { SimpleLabelField } from "./simple-label.field";
import { LobbyUserData } from "../../objects/data/users/lobby-user.data";
import { DEFAULT_STYLE } from "../../cst";

export class LobbyUserField extends SimpleLabelField {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private user: LobbyUserData;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(
    context: Phaser.Scene,
    positionX: number,
    positionY: number,
    user: LobbyUserData,
    style: Phaser.Types.GameObjects.Text.TextStyle = DEFAULT_STYLE
  ) {
    super(context, positionX, positionY, user.name, style);
    this.user = user;
  }

  // *****************************************************************************************************************
  // PUBLIC METHODS
  // *****************************************************************************************************************

  public clear(): void {
    super.clear();
  }
}
