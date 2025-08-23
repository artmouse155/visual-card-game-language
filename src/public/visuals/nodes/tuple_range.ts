import { Card } from "./card.js";
import { Tuple } from "./tuple.js";

export class TupleRange {
  protected origin: Tuple;
  protected startIndex: number; // Inclusive
  protected endIndex: number; // Exclusive

  public get length() {
    return this.endIndex - this.startIndex;
  }

  constructor(origin: Tuple, startIndex: number, endIndex: number) {
    this.origin = origin;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
  }

  at(index: number): Card {
    return this.origin.at(this.startIndex + index);
  }

  move(destination: Tuple, index: number, reverse?: boolean, flip?: boolean) {
    for (let i = 0; i < this.length; i++) {
      const card = this.origin.popCard(this.startIndex);
      if (flip) {
        card.flip();
      }
      destination.insertCard(card, reverse ? index : index + i);
    }
  }
}
