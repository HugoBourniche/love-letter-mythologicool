import { RequestActionEnum } from "./request-action.enum";

export abstract class ARequestedActionData {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private _playerName: string;
  private _action: RequestActionEnum;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  protected constructor() {
    this._playerName = "";
    this._action = RequestActionEnum.IDLE;
  }

  // *****************************************************************************************************************
  // GETTER / SETTER
  // *****************************************************************************************************************

  get playerName(): string {
    return this._playerName;
  }

  set playerName(value: string) {
    this._playerName = value;
  }

  get action(): RequestActionEnum {
    return this._action;
  }

  set action(value: RequestActionEnum) {
    this._action = value;
  }
}
