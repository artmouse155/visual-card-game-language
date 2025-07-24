import { Tuple } from "./tuple.js"; // ts extension gone
import { Label } from "../visuals/nodes/label.js"; // ts extension gone
import { Renderer } from "../visuals/renderer.js";
import { TupleNode } from "../visuals/nodes/tuple_node.js";
import { Vector2 } from "../visuals/utlis.js";
import { Button } from "../visuals/nodes/button.js";
import { Card } from "./card.js";

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

  addTupleNode(x: number, y: number, tuple?: Card[]): TupleNode {
    return this.renderer.addChild(new TupleNode(new Vector2(x, y), tuple));
  }

  addLabel(x: number, y: number, text: string): Label {
    return this.renderer.addChild(new Label(new Vector2(x, y), text));
  }

  addButton(x: number, y: number, text: string): Button {
    return this.renderer.addChild(new Button(new Vector2(x, y), text));
  }

  bindButton(id: string, listener: (this: HTMLElement, ev: MouseEvent) => any) {
    document.getElementById(id)?.addEventListener("click", listener);
  }
}
