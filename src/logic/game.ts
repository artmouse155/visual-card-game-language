import { Tuple } from "./tuple.ts";
import { Label } from "../visuals/label.ts";

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
