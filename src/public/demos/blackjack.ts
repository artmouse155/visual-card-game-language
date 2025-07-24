import type { Suit, Rank } from "../logic/constants.js"; // ts extension gone
import { Orders } from "../logic/constants.js"; // ts extension gone
import { Card, SuitCard, Joker } from "../logic/card.js"; // ts extension gone
import { Deck } from "../logic/deck.js"; // ts extension gone
import { Tuple, Stack } from "../logic/tuple.js"; // ts extension gone
import { Game } from "../logic/game.js"; // ts extension gone

export class Blackjack extends Game {
  /*
    Dealer deals each player 2 cards.
    You can press "hit" to hit or "stay" to stay.
    */

  play() {
    const deck = new Deck(Orders.DEFAULT, 2);
    const stack = new Stack(deck.getCards());
    const hand = new Tuple();
    stack.flip();
    // stack.shuffle();
    // stack.reveal(hand, 5);
    const startButton = this.addButton(325, 250, "Start!");
    startButton.bindClick(() => {
      console.log(stack.toString(), hand.toString());
      const dealerPile = this.addTupleNode(200, 200, stack);
      const playerHand = this.addTupleNode(50, 50, hand);
      const acesPile = this.addTupleNode(300, 50);
      this.addLabel(300, 50, "Blackjack");
      startButton.hide();
      const flipButton = this.addButton(325, 300, "Flip");
      flipButton.bindClick(() => {
        console.log("flipButton clicked");
        dealerPile.reveal(playerHand, 2);
      });

      const grabAceButton = this.addButton(325, 500, "Grab Ace");
      grabAceButton.bindClick(() => {
        dealerPile.moveCard(
          (c: Card, index: number) => {
            return (c as SuitCard).rank == ("A" as Rank);
          },
          acesPile,
          undefined,
          true
        );
      });
    });
  }
}
