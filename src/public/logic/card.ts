import type { Suit, Rank, Order } from "./constants.js";
import { SuitEmojis } from "./constants.js";

export class Card {
  order: Order;
  faceup: boolean = true;

  constructor(order: Order) {
    this.order = order;
  }

  flip(): void {
    this.faceup = !this.faceup;
  }

  setFaceup(faceup: boolean): void {
    this.faceup = faceup;
  }

  toString(): string {
    return this.faceup ? "🂡" : "🂠";
  }
}

export class SuitCard extends Card {
  suit: Suit;
  rank: Rank;

  constructor(suit: Suit, rank: Rank, order: Order) {
    super(order);
    this.suit = suit;
    this.rank = rank;
  }

  toString(): string {
    return this.faceup ? `${this.rank}${SuitEmojis[this.suit]} ` : "";
  }

  getValue(): number {
    return this.order.RankOrder[this.rank];
  }
}

export class Joker extends Card {
  toString(): string {
    return this.faceup ? "🂿" : "";
  }
}
