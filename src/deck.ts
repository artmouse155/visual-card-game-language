import type { Suit, Rank, Order } from "./constants.ts";
import { Orders } from "./constants.ts";
import { Card, SuitCard, Joker } from "./card.ts";
import { Tuple } from "./tuple.ts";

export class Deck {
  static STANDARD = new Deck(Orders.ACE_HIGH);
  order: Order;
  jokerCount: number;

  constructor(order: Order, jokerCount: number = 0) {
    this.order = order;
    this.jokerCount = jokerCount;
  }

  getCards(): Tuple {
    let output: Tuple = new Tuple();
    for (const suitStr in this.order.SuitOrder) {
      const suit: Suit = suitStr as Suit;
      for (const rankStr in this.order.RankOrder) {
        const rank: Rank = rankStr as Rank;
        output.push(new SuitCard(suit, rank, this.order));
      }
    }
    return output;
  }
}
