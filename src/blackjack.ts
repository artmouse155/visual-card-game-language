import type { Suit, Rank } from "./constants.ts";
import { Orders } from "./constants.ts";
import { Card, SuitCard, Joker } from "./card.ts";
import { Deck } from "./deck.ts";
import { Tuple, Stack } from "./tuple.ts";
import { Game } from "./game.ts";

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
  }
}
