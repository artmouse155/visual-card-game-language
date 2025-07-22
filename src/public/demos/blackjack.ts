import type { Suit, Rank } from "../logic/constants.js"; // ts extension gone
import { Orders } from "../logic/constants.js"; // ts extension gone
import { Card, SuitCard, Joker } from "../logic/card.js"; // ts extension gone
import { Deck } from "../logic/deck.js"; // ts extension gone
import { Tuple, Stack } from "../logic/tuple.js"; // ts extension gone
import { Game } from "../logic/game.js"; // ts extension gone
import { Label } from "../visuals/label.js"; // ts extension gone

export class Blackjack extends Game {
  /*
    Dealer deals each player 2 cards.
    You can press "hit" to hit or "stay" to stay.
    */
  play() {
    const deck = new Deck(Orders.DEFAULT, 2);
    const stack = new Stack(deck.getCards());
    stack.flip();
    stack.shuffle();
    const hand = new Tuple();
    stack.reveal(hand, 5);
    console.log(stack.toString(), hand.toString());

    this.addTuple(stack);
    this.addTuple(hand);
    this.addLabel({ x: 50, y: 50, text: "Howdy!" });
    this.bindButton("render", () => {
      this.renderer.render();
    });
  }
}
