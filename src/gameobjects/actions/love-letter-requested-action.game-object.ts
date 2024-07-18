import { ARequestedActionGameObject } from "./a-requested-action.game-object";
import { LoveLetterRequestedActionData } from "../../objects/data/game/actions/love-letter-requested-action.data";
import Phaser from "phaser";
import { RequestActionEnum } from "../../objects/data/game/actions/request-action.enum";

export class LoveLetterRequestedActionGameObject extends ARequestedActionGameObject<LoveLetterRequestedActionData> {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUTS
  private readonly _currentPlayerName: string;

  // OBJECTS
  // VARIABLES

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(
    context: Phaser.Scene,
    positionX: number,
    positionY: number,
    requestedAction: LoveLetterRequestedActionData,
    currentPlayerName: string
  ) {
    super(context, positionX, positionY, requestedAction);
    this._currentPlayerName = currentPlayerName;
    this.create();
  }

  // *****************************************************************************************************************
  // PHASER LIFE CYCLE
  // *****************************************************************************************************************

  public override create() {
    super.create();
  }
  // *****************************************************************************************************************
  // OVERRIDE METHODS
  // *****************************************************************************************************************

  protected override buildRequestedActionLabel() {
    const playerTurnName = this._requestedAction.playerName;
    if (this._currentPlayerName === playerTurnName) {
      switch (this._requestedAction.action) {
        case RequestActionEnum.DRAW:
          return "Draw a card";
        default:
          break;
      }
    }
    return "This is " + playerTurnName + "'s turn";
  }

  // *****************************************************************************************************************
  // PUBLIC METHODS
  // *****************************************************************************************************************

  // *****************************************************************************************************************
  // PRIVATE METHODS
  // *****************************************************************************************************************
}
