import { Card } from "./card.js";
import { Tuple } from "./tuple.js";

export class TupleRange {
  protected origin: Tuple;
  protected startIndex: number;
  protected endIndex: number;

  constructor(origin: Tuple, startIndex: number, endIndex: number) {
    this.origin = origin;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
  }

  at(index: number): Card {
    return this.origin.at(this.startIndex + index);
  }
}
