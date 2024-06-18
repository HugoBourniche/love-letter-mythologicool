export class PreloadService {
  private context: Phaser.Scene;

  constructor(context: Phaser.Scene) {
    this.context = context;
  }

  public loadMainMenuImages() {
    this.context.load.setBaseURL("./assets/");
    this.loadBackground();
    this.loadUI();
  }

  public loadBackground() {
    this.context.load.image("background", "images/background/background1.png");
  }

  public loadUI() {
    this.context.load.image(
      "stone_input-frame",
      "images/forms/stoneButtonFrame.png"
    );
    this.context.load.image(
      "stone_button",
      "images/forms/stoneButtonInsetReady.png"
    );
    this.context.load.image("button", "images/forms/button.png");
    this.context.load.image(
      "stone_buttonHover",
      "images/forms/stoneButtonInsetHovered.png"
    );
    this.context.load.image("buttonHover", "images/forms/buttonHover.png");
  }

  public loadBaseImages() {
    this.context.load.setBaseURL("./assets/");
    this.context.load.image("cardBack", "images/cards/card_back.png");
    this.context.load.image("cardFront1", "images/cards/card_1_front.png");
    this.context.load.image("cardFront2", "images/cards/card_2_front.png");
    this.context.load.image("cardFront3", "images/cards/card_3_front.png");
    this.context.load.image("cardFront4", "images/cards/card_4_front.png");
    this.loadLoveLetterClassicPresetImages();
  }

  public loadLoveLetterClassicPresetImages() {
    this.loadLoveLetterClassicCards();
  }

  public loadLoveLetterClassicCards() {
    this.context.load.image(
      "loveletter_classic_dos",
      "images/cards/card_loveletter_classic_dos_2.png"
    );
    this.context.load.image(
      "loveletter_classic_0_spy",
      "images/cards/card_loveletter_classic_0_espionne.png"
    );
    this.context.load.image(
      "loveletter_classic_1_guard",
      "images/cards/card_loveletter_classic_1_garde.png"
    );
    this.context.load.image(
      "loveletter_classic_2_priest",
      "images/cards/card_loveletter_classic_2_pretre.png"
    );
    this.context.load.image(
      "loveletter_classic_3_baron",
      "images/cards/card_loveletter_classic_3_baron.png"
    );
    this.context.load.image(
      "loveletter_classic_4_handmaid",
      "images/cards/card_loveletter_classic_4_servante.png"
    );
    this.context.load.image(
      "loveletter_classic_5_prince",
      "images/cards/card_loveletter_classic_5_prince.png"
    );
    this.context.load.image(
      "loveletter_classic_6_chancellor",
      "images/cards/card_loveletter_classic_6_chancelier.png"
    );
    this.context.load.image(
      "loveletter_classic_7_king",
      "images/cards/card_loveletter_classic_7_roi.png"
    );
    this.context.load.image(
      "loveletter_classic_8_countess",
      "images/cards/card_loveletter_classic_8_comtesse.png"
    );
    this.context.load.image(
      "loveletter_classic_9_princess",
      "images/cards/card_loveletter_classic_9_princesse.png"
    );
  }
}
