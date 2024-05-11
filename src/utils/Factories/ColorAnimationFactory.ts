import {ColorAnimationType} from "../../objects/colorAnimations/ColorAnimationType";
import DefaultColorAnimation from "../../objects/colorAnimations/implementations/DefaultColorAnimation";
import BlinkColorAnimation from "../../objects/colorAnimations/implementations/BlinkColorAnimation";
import RandomColorAnimation from "../../objects/colorAnimations/implementations/RandomColorAnimation";
import FadingBlinkColorAnimation from "../../objects/colorAnimations/implementations/FadingBlinkColorAnimation";
import FadingColorAnimation from "../../objects/colorAnimations/implementations/FadingColorAnimation";
import FadingRandomColorAnimation from "../../objects/colorAnimations/implementations/FadingRandomColorAnimation";
import BlinkRandomColorAnimation from "../../objects/colorAnimations/implementations/BlinkRandomColorAnimation";

export class ColorAnimationFactory {

    /**
     * Build a proper Color Animation Object thanks to its type
     * @param colorAnimation Type of the color animation, see the enumeration ColorAnimationType
     * @param colors List of colors to use in animation
     * @param characterPosition Index of the character in the string
     */
    public static build(colorAnimation: ColorAnimationType, colors: string[], characterPosition: number) {
        switch (colorAnimation) {
            case ColorAnimationType.BLINK:          return new BlinkColorAnimation(colors);
            case ColorAnimationType.BLINK_RANDOM:   return new BlinkRandomColorAnimation(colors, characterPosition);
            case ColorAnimationType.RANDOM:         return new RandomColorAnimation();
            case ColorAnimationType.FADING:         return new FadingColorAnimation(colors);
            case ColorAnimationType.FADING_BLINK:   return new FadingBlinkColorAnimation(colors);
            case ColorAnimationType.FADING_RANDOM:  return new FadingRandomColorAnimation(characterPosition);
            case ColorAnimationType.DEFAULT:
            default: return new DefaultColorAnimation(colors);

        }
    }
}