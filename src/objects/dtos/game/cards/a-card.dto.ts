export abstract class ACardDTO {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  public id: string;
  public spriteId: string;
  public facingDown: boolean;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  protected constructor() {
    this.id = "";
    this.spriteId = "";
    this.facingDown = true;
  }
}
