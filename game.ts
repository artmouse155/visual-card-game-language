import type { Suit, Rank } from "./constants.ts";
import { Orders } from "./constants.ts";
import { Card, SuitCard, Joker } from "./card.ts";
import { Deck } from "./deck.ts";

export class Game {
  constructor() {}

  play() {
    let deck = new Deck(Orders.DEFAULT, 0);
    let cards = deck.getCards();
    console.log("Play");
  }
}
