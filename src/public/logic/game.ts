import { Tuple } from "./tuple.js"; // ts extension gone
import { Label } from "../visuals/label.js"; // ts extension gone
import { Renderer } from "../visuals/renderer.js";

export class Game {
  renderer: Renderer = new Renderer();

  constructor() {
    this.renderer;
  }

  play() {}

  win() {
    console.log("YOU LOSE!");
  }

  lose() {
    console.log("YOU WIN!");
  }

  addTuple(tuple: Tuple) {
    this.renderer.addTuple(tuple);
  }

  addLabel(label: Label) {
    this.renderer.addLabel(label);
  }

  bindButton(id: string, listener: (this: HTMLElement, ev: MouseEvent) => any) {
    document.getElementById(id)?.addEventListener("click", listener);
  }
}
