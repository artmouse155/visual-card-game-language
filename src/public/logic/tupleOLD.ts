import type { Suit, Rank } from "./constants.js"; // ts extension gone
import { Card, SuitCard, Joker } from "./card.js"; // ts extension gone

class Tuple extends Array<Card> {
  x = 0;
  y = 0;

  constructor(cards: Array<Card> = []) {
    super();
    this.set(cards);
  }

  shuffle(): void {
    const randInRange = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    let current: Array<Card> = [...this];
    let temp: Array<Card> = [];
    while (current.length > 0) {
      const index = randInRange(0, current.length);
      temp = temp.concat(current.splice(index, 1));
    }

    this.set(temp);
  }

  flip(): void {
    this.reverse();
    const cards = [...this];
    cards.map((card) => card.flip());
    this.set(cards);
  }

  set(cards: Array<Card>): void {
    this.length = 0;
    this.push(...cards);
  }

  gain(cards: Array<Card>): void {
    this.push(...cards);
  }

  draw(destination: Tuple, count: number = 1): void {
    let output: Array<Card> = [];
    for (let index = 0; index < count && this.length > 0; index++) {
      const card: Card | undefined = this.pop();
      if (card) {
        output.push(card);
      }
    }
    destination.gain(output);
  }

  reveal(destination: Tuple, count: number = 1): void {
    let output: Array<Card> = [];
    for (let index = 0; index < count && this.length > 0; index++) {
      const card: Card | undefined = this.pop();
      if (card) {
        card.setFaceup(true);
        output.push(card);
      }
    }
    destination.gain(output);
  }
}

export class Stack extends Tuple {
  toString(): string {
    return `${this.length > 0 ? this[this.length - 1] : "X"} (x${this.length})`;
  }
}
