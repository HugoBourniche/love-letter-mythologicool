export class UserData {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private _name: string;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor() {
    this._name = "";
  }

  // *****************************************************************************************************************
  // GETTER
  // *****************************************************************************************************************

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
