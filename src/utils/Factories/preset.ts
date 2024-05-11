import AnimatedText from "../../objects/AnimatedText";
import {COLOR_ANIMATION} from "../../cst";
import {ColorAnimationType} from "../../objects/colorAnimations/ColorAnimationType";

export default class Preset {

    /**
     * Build an animated text for as the title preset
     * @param scene Phaser Scene where the text will be displayed
     * @param text Text to display, default value = 'stream is starting'
     */
    public static buildTitleObject(scene: Phaser.Scene, text: string = 'stream is starting') {
        return new AnimatedText(20, 20, text, 50, 'sugar', ["#9AD7EA", "#094464"], COLOR_ANIMATION, scene);
    }

    /**
     * Build a default animated text
     * @param scene Phaser Scene where the text will be displayed
     * @param text Text to display on the scene
     * @param x Horizontal position as number
     * @param y Vertical position as number
     * @param textColorAnimationType Type of animation the color will do
     * @param fontSize Size of the font, default = 50
     * @param fontFamily Font of the text, default 'sugar'
     * @param colors List of colors, default ["#9AD7EA", "#094464"]
     */
    public static buildTextObject(
        scene: Phaser.Scene,
        text: string,
        x: number,
        y: number,
        textColorAnimationType: ColorAnimationType = COLOR_ANIMATION,
        fontSize = 50,
        fontFamily = 'sugar',
        colors = ["#9AD7EA", "#094464"],
    ) {
        return new AnimatedText(x, y, text, fontSize, fontFamily, colors, textColorAnimationType, scene);
    }
}
