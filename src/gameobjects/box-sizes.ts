export class BoxSizes {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  private readonly _xStart: number;
  private readonly _yStart: number;
  private readonly _xEnd: number;
  private readonly _yEnd: number;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(xStart: number, yStart: number, xEnd: number, yEnd: number) {
    this._xStart = xStart;
    this._yStart = yStart;
    this._xEnd = xEnd;
    this._yEnd = yEnd;
  }

  // *****************************************************************************************************************
  // PUBLIC METHODS
  // *****************************************************************************************************************

  public x(position: number): number {
    if (position < 0) return this._xStart;
    if (this._xStart + position > this._xEnd) return this._xEnd;
    return this._xStart + position;
  }

  public y(position: number): number {
    if (position < 0) return this._yStart;
    if (this._yStart + position > this._yEnd) return this._yEnd;
    return this._yStart + position;
  }

  // *****************************************************************************************************************
  // GETTER
  // *****************************************************************************************************************

  get xStart(): number {
    return this._xStart;
  }

  get yStart(): number {
    return this._yStart;
  }

  get xEnd(): number {
    return this._xEnd;
  }

  get yEnd(): number {
    return this._yEnd;
  }

  get width(): number {
    return this._xEnd - this._xStart;
  }

  get height(): number {
    return this._yEnd - this._yStart;
  }

  get midWidth(): number {
    return this._xStart + this.width / 2;
  }

  get midHeight(): number {
    return this._yStart + this.height / 2;
  }
}
