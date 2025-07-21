import type { Suit, Rank, Order } from "./constants.ts";

export class Card {
  order: Order;
  faceup: boolean = true;

  constructor(order: Order) {
    this.order = order;
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
    return this.faceup ? `<${this.suit[0]}${this.rank}>` : "🂠";
  }
}

export class Joker extends Card {
  toString(): string {
    return this.faceup ? "🂿" : "🂠";
  }
}
