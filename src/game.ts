import type { Suit, Rank } from "./constants.ts";
import { Orders } from "./constants.ts";
import { Card, SuitCard, Joker } from "./card.ts";
import { Deck } from "./deck.ts";

export class Game {
  constructor() {}

  play() {}

  win() {
    console.log("YOU LOSE!");
  }

  lose() {
    console.log("YOU WIN!");
  }
}
