import Phaser from "phaser";

export const SCREEN_WIDTH = 1280;
export const SCREEN_HEIGHT = 720;

export const CARD_LIST = [
    "loveletter_classic_0_spy", "loveletter_classic_0_spy",
    "loveletter_classic_1_guard", "loveletter_classic_1_guard", "loveletter_classic_1_guard", "loveletter_classic_1_guard", "loveletter_classic_1_guard", "loveletter_classic_1_guard," +
    "loveletter_classic_2_priest", "loveletter_classic_2_priest",
    "loveletter_classic_3_baron", "loveletter_classic_3_baron",
    "loveletter_classic_4_handmaid", "loveletter_classic_4_handmaid",
    "loveletter_classic_5_prince", "loveletter_classic_5_prince",
    "loveletter_classic_6_chancellor", "loveletter_classic_6_chancellor",
    "loveletter_classic_7_king",
    "loveletter_classic_8_countess",
    "loveletter_classic_9_princess"
]

export const DEFAULT_FONT_SIZE = '23px';
export const DEFAULT_STYLE = { fontSize: DEFAULT_FONT_SIZE, fill: '#000000'} as Phaser.Types.GameObjects.Text.TextStyle;
export const DEFAULT_STYLE_WHITE = { fontSize: DEFAULT_FONT_SIZE, fill: '#ffffff'} as Phaser.Types.GameObjects.Text.TextStyle;