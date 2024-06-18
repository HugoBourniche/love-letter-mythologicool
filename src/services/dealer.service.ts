import { CardService } from "./card.service";
import Card from "../objects/card";
import { randomInt } from "../utils/utils";
import { CARD_LIST } from "../cst";

export class DealerService {
  private context: Phaser.Scene;
  private cardService: CardService;

  constructor(context: Phaser.Scene) {
    this.context = context;
    this.cardService = new CardService(context);
  }

  public dealCards() {
    for (let i = 0; i < 5; i++) {
      const playerCard = new Card(this.context);
      const randomIntValue = randomInt(CARD_LIST.length);
      playerCard.render(475 + i * 100, 650, CARD_LIST[randomIntValue]);
    }
  }
}
