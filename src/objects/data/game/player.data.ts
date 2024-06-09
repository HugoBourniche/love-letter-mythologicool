import { CardData } from "./card.data";

export class PlayerData {
  private name: string;
  private position: number;
  private hand: CardData[];

  constructor(name: string, position: number, hand: CardData[]) {
    this.name = name;
    this.position = position;
    this.hand = hand;
  }
}
