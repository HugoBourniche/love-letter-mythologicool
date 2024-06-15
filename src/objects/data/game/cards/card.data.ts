export abstract class CardData {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private _id: string;
  private _spriteId: string;
  private _facingDown: boolean;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  protected constructor() {
    this._id = "";
    this._spriteId = "";
    this._facingDown = true;
  }

  // *****************************************************************************************************************
  // GETTER / SETTER
  // *****************************************************************************************************************

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get spriteId(): string {
    return this._spriteId;
  }

  set spriteId(value: string) {
    this._spriteId = value;
  }

  get facingDown(): boolean {
    return this._facingDown;
  }

  set facingDown(value: boolean) {
    this._facingDown = value;
  }
}
