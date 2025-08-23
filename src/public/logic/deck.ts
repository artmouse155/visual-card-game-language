import type { Suit, Rank, Order } from "./constants.js"; // ts extension gone
import { Orders } from "./constants.js"; // ts extension gone
import {
  CardNode,
  JokerCardNode,
  SuitCardNode,
} from "../visuals/nodes/card_node.js";

export class Deck {
  static STANDARD = new Deck(Orders.ACE_HIGH);
  order: Order;
  jokerCount: number;

  constructor(order: Order, jokerCount: number = 0) {
    this.order = order;
    this.jokerCount = jokerCount;
  }

  getCards(): Array<CardNode> {
    let output: Array<CardNode> = [];
    for (const suitStr in this.order.SuitOrder) {
      const suit: Suit = suitStr as Suit;
      for (const rankStr in this.order.RankOrder) {
        const rank: Rank = rankStr as Rank;
        output.push(new SuitCardNode(suit, rank, this.order));
      }
    }
    for (let index = 0; index < this.jokerCount; index++) {
      output.push(new JokerCardNode());
    }
    return output;
  }
}
