import type { Suit, Rank } from "./constants.ts";
import { Card, SuitCard, Joker } from "./card.ts";

export class Tuple extends Array<Card> {
  shuffle(): void {
    const randInRange = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    let temp: Array<Card> = [];
    while (this.length > 0) {
      const index = randInRange(0, this.length);
      temp = temp.concat(this.splice(index, 1));
    }

    while (temp.length > 0) {
      this.push(temp.splice(0, 1)[0]);
    }
  }

  toString(): string {
    return `${this.length > 0 ? this.at(this.length - 1) : "X"} (x${
      this.length
    })`;
  }

  flip(): void {
    this.reverse();
    this.map((x) => x.flip());
  }
}
