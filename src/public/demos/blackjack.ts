import type {
  Suit,
  Rank,
  OnlyOrders,
  Order,
  RankOrder,
} from "../logic/constants.js"; // ts extension gone
import { Orders, SuitOrders } from "../logic/constants.js"; // ts extension gone
import { Card, SuitCard, Joker } from "../logic/card.js"; // ts extension gone
import { Deck } from "../logic/deck.js"; // ts extension gone
import { Game } from "../logic/game.js"; // ts extension gone

export class Blackjack extends Game {
  /*
    Dealer deals each player 2 cards.
    You can press "hit" to hit or "stay" to stay.
    */

  play() {
    // Create Blackjack Order
    const blackjackOrder: RankOrder = {
      A: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      J: 10,
      Q: 10,
      K: 10,
    };

    const deck = new Deck({
      RankOrder: blackjackOrder,
      SuitOrder: SuitOrders.DEFAULT,
    });
    const titleLabel = this.addLabel(320, 25, "Blackjack");
    const startButton = this.addButton(325, 250, "Start!");

    startButton.bindClick(() => {
      startButton.hide();

      const drawPile = this.addTupleNode(300, 250, "flush", deck.getCards());

      const dealerHand = this.addTupleNode(300, 125, "staggered_right");
      const playerHand = this.addTupleNode(300, 425, "staggered_right");

      let dealerScore = 0;
      let playerScore = 0;

      const dealerScoreLabel = this.addLabel(300, 75, "Dealer Score: 0");
      const playerScoreLabel = this.addLabel(300, 375, "Player Score: 0");

      drawPile.shuffle();
      drawPile.flip();

      const blackjackCalcScore = (cards: Card[]): number => {
        let score = 0;
        let aces = 0;

        for (const card of cards) {
          const suitCard = card as SuitCard;
          if (suitCard) {
            if (suitCard.rank == ("A" as Rank)) {
              score += 1;
              aces++;
            } else {
              score += suitCard.getValue();
            }
          }
        }
        for (let index = 0; index < aces; index++) {
          if (score >= 21) {
            break;
          }
          score += 10;
        }
        return score;
      };

      const dealerTurn = () => {
        flipButton.disabled = true;
        endTurnButton.disabled = true;
      };

      const flipButton = this.addButton(25, 400, "Hit", true);
      const endTurnButton = this.addButton(25, 500, "End Turn", true);

      // Start player turn
      flipButton.disabled = false;
      endTurnButton.disabled = false;

      flipButton.bindClick(() => {
        console.log("Hit button clicked");
        drawPile.reveal(playerHand, 1);
        playerScore = blackjackCalcScore(playerHand.getCards());
        playerScoreLabel.text = `Player Score: ${playerScore}`;
        if (playerScore >= 21) {
          flipButton.disabled = true;
          endTurnButton.disabled = true;
          if (playerScore == 21) {
            this.win();
          } else {
            this.lose();
          }
        }
      });
      endTurnButton.bindClick(() => dealerTurn);
    });
  }
}
