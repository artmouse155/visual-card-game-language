import { Tuple } from "./tuple.js"; // ts extension gone
import { Label } from "../visuals/label.js"; // ts extension gone

export class Game {
  tuples: Array<Tuple> = [];
  labels: Array<Label> = [];

  constructor() {}

  play() {}

  win() {
    console.log("YOU LOSE!");
  }

  lose() {
    console.log("YOU WIN!");
  }

  add(visualElement: Tuple | Label) {}
}
