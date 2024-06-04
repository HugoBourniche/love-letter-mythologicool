import Phaser, {Scene} from "phaser";

import Text = Phaser.GameObjects.Text;
import Image = Phaser.GameObjects.Image;
import Graphics = Phaser.GameObjects.Graphics;
import Tween = Phaser.Tweens.Tween;
import GameObject = Phaser.GameObjects.GameObject;

export class TextInputField {

    // *****************************************************************************************************************
    // ATTRIBUTES
    // *****************************************************************************************************************

    // OBJECTS
    private context:  Scene;
    private textObject: Text;
    private imageFrame: Image | undefined;
    private rectangleFrame: Graphics | undefined;
    private cursor: Text | undefined;
    private tweens: Tween;


    // CUSTOM VALUES
    private positionX: number;
    private positionY: number;
    private value: string;
    private placeholder: string;
    private isFocus: boolean;
    private maxLength: number;
    private style: Phaser.Types.GameObjects.Text.TextStyle;

    // *****************************************************************************************************************
    // CONSTRUCTOR
    // *****************************************************************************************************************

    constructor(context: Phaser.Scene, positionX: number, positionY: number, placeholder: string, style: Phaser.Types.GameObjects.Text.TextStyle, maxLength = 16) {
        this.context = context;
        this.style = style;
        this.positionX = positionX;
        this.positionY = positionY;
        this.value = placeholder;
        this.placeholder = placeholder;
        this.isFocus = false;
        this.maxLength = maxLength;

        // INIT OBJECTS

        this.textObject = this.context.add.text(positionX, positionY, this.value, style).setDepth(22);

        this.initFieldBoxes();
        this.initCursor();
        this.initKeydownEvent();
    }

    // *****************************************************************************************************************
    // PRIVATE METHODS
    // *****************************************************************************************************************

    // INITIALIZERS

    private initFieldBoxes() {
        this.imageFrame = this.context.add.image(this.positionX, this.positionY, 'input-frame');
        this.imageFrame.setScale(1.2, 0.60).setInteractive().setDepth(20);

        this.rectangleFrame = this.context.add.graphics({x: this.positionX - 20, y: this.positionY - 20});
        this.rectangleFrame.fillStyle(0xffffff, 1).setDepth(21);
        this.rectangleFrame.fillRect(0, 0, 300, 65);
        this.rectangleFrame.setInteractive(new Phaser.Geom.Rectangle(0, 0, 300, 65), Phaser.Geom.Rectangle.Contains);

        this.animateAfterFocus(this.imageFrame);
        this.animateAfterFocus(this.rectangleFrame);
    }

    private initCursor() {
        const cursorStyle = { fontSize: '32px', fill: '#000000' };
        this.cursor = this.context.add.text(this.positionX + 50, this.positionY - 4, '|', cursorStyle);
        this.cursor.setDepth(21).setAlpha(0);

        this.tweens = this.context.tweens.add(
            {
                targets: this.cursor,
                alpha: 1,
                duration: 300,
                hold: 600,
                yoyo: true,
                repeat: -1,
                paused: true
            }
        );

    }

    private initKeydownEvent() {
        this.context.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
            if (!this.isFocus) {
                return;
            }

            if (event.key === "Backspace" && this.value.length > 0) { // Delete
                this.value = this.value.slice(0, -1);
            } else if (event.key.length === 1 && event.key.match(/[a-zA-Z0-9\s\-_]/) && this.value.length < this.maxLength) {
                this.value += event.key
            } else if ( this.value.length === this.maxLength) {
                //
            }
            this.textObject.text = this.value;
        });
    }

    // Activate/ deactivate the input form
    private animateAfterFocus(gameObject: GameObject) {
        gameObject.on('pointerup', () => {
            console.log("Pointer up");
            if (this.isFocus) {
                return;
            }
            this.isFocus = true;

            // Reset name form
            if (this.value === this.placeholder) {
                this.updateValue('');
            }

            // Add blinking cursor
            this.cursor?.setAlpha(0);
            this.tweens.resume();

            // Activate the on-screen keyboard for mobile devices
            // if (isMobileDevice()) {
            //     gameState.hiddenInput.focus();
            // }

            // deactivateNameForm() must be called after a short delay to ensure that the pointerup
            // event that called activateNameForm() doesn't inadvertently call it as well.
            this.context.time.delayedCall(200, () => {
                this.animateFocusOut();
            });
        });
    }

    private animateFocusOut() {
        this.context.input.off('pointerup');
        this.context.input.once('pointerup', () => {

            if (this.isFocus) {
                let delayTime = 0;

                // Reset form if it's empty
                if (!this.value) {
                    this.updateValue(this.placeholder);
                    delayTime = 100; // Gives Update() time to update the name field before !isEnteringName.
                }

                // Deactivates typing
                this.context.time.delayedCall(delayTime, () => {
                    this.isFocus = false;
                })

                // Remove cursor
                this.cursor?.setAlpha(0);
                this.tweens.pause();

                // Deactivate the on-screen keyboard for mobile devices
                // if (isMobileDevice()) {
                //     gameState.hiddenInput.blur();
                // }
            }
        });
    }

    private updateValue(value: string) {
        this.value = value;
        this.textObject.text = value;
    }

}