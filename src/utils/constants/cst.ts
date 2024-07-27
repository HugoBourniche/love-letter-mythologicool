import Phaser from "phaser";

// Phaser events
export const PHASER_EVENT_KEY_DOWN = "keydown";
export const PHASER_EVENT_POINTER_OUT = "pointerout";
export const PHASER_EVENT_POINTER_OVER = "pointerover";
export const PHASER_EVENT_POINTER_UP = "pointerup";

export const DEFAULT_FONT_SIZE = "23px";
export const DEFAULT_STYLE = {
  fontSize: DEFAULT_FONT_SIZE,
  fill: "#000000",
} as Phaser.Types.GameObjects.Text.TextStyle;
export const DEFAULT_STYLE_WHITE = {
  fontSize: DEFAULT_FONT_SIZE,
  fill: "#ffffff",
} as Phaser.Types.GameObjects.Text.TextStyle;

export const TIME_5S = 5000;
export const TIME_3S = 3000;
export const TIME_1000MS = 1000;
export const TIME_500MS = 500;
export const TIME_50MS = 50;

export const LOBBY_RATE = TIME_5S;
export const GAME_RATE = TIME_3S;
