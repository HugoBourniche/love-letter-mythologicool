import Phaser from "phaser";

export const CARD_LIST = [
  "loveletter_classic_0_spy",
  "loveletter_classic_0_spy",
  "loveletter_classic_1_guard",
  "loveletter_classic_1_guard",
  "loveletter_classic_1_guard",
  "loveletter_classic_1_guard",
  "loveletter_classic_1_guard",
  "loveletter_classic_1_guard," + "loveletter_classic_2_priest",
  "loveletter_classic_2_priest",
  "loveletter_classic_3_baron",
  "loveletter_classic_3_baron",
  "loveletter_classic_4_handmaid",
  "loveletter_classic_4_handmaid",
  "loveletter_classic_5_prince",
  "loveletter_classic_5_prince",
  "loveletter_classic_6_chancellor",
  "loveletter_classic_6_chancellor",
  "loveletter_classic_7_king",
  "loveletter_classic_8_countess",
  "loveletter_classic_9_princess",
];

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
