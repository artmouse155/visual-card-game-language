import { Tuple } from "./tuple.js"; // ts extension gone
import { Label } from "../visuals/nodes/label.js"; // ts extension gone
import { Renderer } from "../visuals/renderer.js";
import { TupleNode } from "../visuals/nodes/tuple_node.js";
import { Vector2 } from "../visuals/utlis.js";

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

  addTupleNode(x: number, y: number, tuple: Tuple): void {
    this.renderer.addChild(new TupleNode(new Vector2(x, y), tuple));
  }

  addLabel(x: number, y: number, text: string): void {
    this.renderer.addChild(new Label(new Vector2(x, y), text));
  }

  bindButton(id: string, listener: (this: HTMLElement, ev: MouseEvent) => any) {
    document.getElementById(id)?.addEventListener("click", listener);
  }
}
