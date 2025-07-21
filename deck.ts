import type { Suit, Rank, Order } from "./constants.ts";
import { Orders } from "./constants.ts";
import { Card, SuitCard, Joker } from "./card.ts";

export class Deck {
  static STANDARD = new Deck(Orders.ACE_HIGH);
  order: Order;
  jokerCount: number;

  constructor(order: Order, jokerCount: number = 0) {
    this.order = order;
    this.jokerCount = jokerCount;
  }

  getCards(): Array<Card> {
    let output: Array<Card> = [];
    for (const suit in this.order.SuitOrder) {
      output.push(new SuitCard(suit, 1, this.order));
    }
    return output;
  }
}
