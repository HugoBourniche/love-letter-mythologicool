import { SimpleLabelField } from "../gameobjects/forms/simple-label.field";
import { Scene } from "phaser";
import { DEFAULT_STYLE_WHITE } from "../cst";
import { UserData } from "./data/users/user.data";

export class PlayerGameObject {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private _context: Scene;
  // Values
  private _user: UserData;

  // Game objects
  private text: SimpleLabelField;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(
    context: Scene,
    positionX: number,
    positionY: number,
    user: UserData
  ) {
    this._context = context;
    this._user = user;
    this.text = new SimpleLabelField(
      context,
      positionX,
      positionY,
      user.name,
      DEFAULT_STYLE_WHITE
    );
  }

  // *****************************************************************************************************************
  // PUBLIC METHODS
  // *****************************************************************************************************************
}
