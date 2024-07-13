import Phaser, { Scene } from "phaser";

import Text = Phaser.GameObjects.Text;
import Image = Phaser.GameObjects.Image;
import Graphics = Phaser.GameObjects.Graphics;
import Tween = Phaser.Tweens.Tween;
import GameObject = Phaser.GameObjects.GameObject;
import { SimpleField } from "./simple.field";
import { DEFAULT_STYLE } from "../../cst";

/**
 * Source
 *
 * Code
 * https://github.com/ErlendKK/Input-form-built-in-Phaser-3.5-with-no-DOM-Element/blob/main/menu.js
 * Test
 * https://raw.githack.com/ErlendKK/Input-form-with-Phaser-3.5-No-DOM-Elements-/main/index.html
 */
export class TextInputField extends SimpleField {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  // INPUTS
  private _placeholder: string;
  private _maxLength: number;
  private _style: Phaser.Types.GameObjects.Text.TextStyle;

  // OBJECTS
  private _textObject: Text;
  private _imageFrame?: Image;
  private _rectangleFrame?: Graphics;
  private _cursor?: Text;
  private _tween?: Tween;

  // VARIABLES
  private _value: string;
  private _isFocus: boolean;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor(
    context: Scene,
    positionX: number,
    positionY: number,
    placeholder: string,
    style: Phaser.Types.GameObjects.Text.TextStyle = DEFAULT_STYLE,
    maxLength = 16
  ) {
    super(context, positionX, positionY);
    this._placeholder = placeholder;
    this._value = "";
    this._style = style;
    this._maxLength = maxLength;
    this._isFocus = false;

    // INIT OBJECTS

    this._textObject = this._context.add
      .text(positionX - 140, positionY - 12, this._placeholder, style)
      .setDepth(22);

    this.initFieldBoxes();
    this.initCursor();
    this.initKeydownEvent();
  }

  // *****************************************************************************************************************
  // PUBLIC METHODS
  // *****************************************************************************************************************

  public value(): string {
    if (this._value == this._placeholder) {
      return "";
    }
    return this._value.trim();
  }

  public update(): void {
    let textWidth = 0;
    if (this._isFocus) {
      // Dynamically updates the displayed input text as it is being typed
      this._textObject.setText(
        !this._isFocus && this._value == "" ? this._placeholder : this._value
      );
      textWidth = this._textObject.width;

      // Dynamically positions the cursor at the end of the typed text
      if (this._cursor) {
        this._cursor.x = this._textObject.x + textWidth - 7;
      }
    }
  }

  public clear(): void {
    this._textObject.removedFromScene();
    this._imageFrame?.removedFromScene();
    this._rectangleFrame?.removedFromScene();
    this._cursor?.removedFromScene();
    this._tween?.removeAllListeners();
  }

  // *****************************************************************************************************************
  // PRIVATE METHODS
  // *****************************************************************************************************************

  // INITIALIZERS

  private initFieldBoxes() {
    this._imageFrame = this._context.add.image(
      this._positionX,
      this._positionY,
      "stone_input-frame"
    );
    this._imageFrame.setScale(1.2, 0.6).setInteractive().setDepth(20);

    this._rectangleFrame = this._context.add.graphics({
      x: this._positionX - 145,
      y: this._positionY - 30,
    });
    this._rectangleFrame.fillStyle(0xffffff, 0.9).setDepth(21);
    this._rectangleFrame.fillRect(0, 0, 290, 60);
    this._rectangleFrame.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, 290, 60),
      Phaser.Geom.Rectangle.Contains
    );

    this.animateAfterFocus(this._imageFrame);
    this.animateAfterFocus(this._rectangleFrame);
  }

  private initCursor() {
    const cursorStyle = { fontSize: "32px", fill: "#000000" };
    this._cursor = this._context.add.text(
      this._positionX + 50,
      this._positionY - 20,
      "|",
      cursorStyle
    );
    this._cursor.setDepth(21).setAlpha(0);

    this._tween = this._context.tweens.add({
      targets: this._cursor,
      alpha: 1,
      duration: 300,
      hold: 600,
      yoyo: true,
      repeat: -1,
      paused: true,
    });
  }

  private initKeydownEvent() {
    this._context.input.keyboard?.on("keydown", (event: KeyboardEvent) => {
      if (!this._isFocus) {
        return;
      }

      if (event.key === "Backspace" && this._value.length > 0) {
        // Delete
        this._value = this._value.slice(0, -1);
      } else if (
        event.key.length === 1 &&
        event.key.match(/[a-zA-Z0-9\s\-_]/) &&
        this._value.length < this._maxLength
      ) {
        this._value += event.key;
      } else if (this._value.length === this._maxLength) {
        // max
      }
      this._textObject.text = this._value;
    });
  }

  // Activate/ deactivate the input form
  private animateAfterFocus(gameObject: GameObject) {
    gameObject.on("pointerup", () => {
      console.log("Pointer up");
      if (this._isFocus) {
        return;
      }
      this._isFocus = true;

      // Reset name form
      if (this._value === this._placeholder) {
        this._value = "";
      }

      // Add blinking cursor
      this._cursor?.setAlpha(0);
      this._tween?.resume();

      // Activate the on-screen keyboard for mobile devices
      // if (isMobileDevice()) {
      //     gameState.hiddenInput.focus();
      // }

      // deactivateNameForm() must be called after a short delay to ensure that the pointerup
      // event that called activateNameForm() doesn't inadvertently call it as well.
      this._context.time.delayedCall(200, () => {
        this.animateFocusOut();
      });
    });
  }

  private animateFocusOut() {
    this._context.input.off("pointerup");
    this._context.input.once("pointerup", () => {
      if (this._isFocus) {
        let delayTime = 0;

        // Reset form if it's empty
        if (this._value == "") {
          this._value = this._placeholder;
          delayTime = 100; // Gives Update() time to update the name field before !isEnteringName.
        }

        // Deactivates typing
        this._context.time.delayedCall(delayTime, () => {
          this._isFocus = false;
        });

        // Remove cursor
        this._cursor?.setAlpha(0);
        this._tween?.pause();

        // Deactivate the on-screen keyboard for mobile devices
        // if (isMobileDevice()) {
        //     gameState.hiddenInput.blur();
        // }
      }
    });
  }
}
