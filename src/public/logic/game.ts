import { Label } from "../visuals/nodes/label.js"; // ts extension gone
import { Renderer } from "../visuals/renderer.js";
import { TupleNode, TupleNodeType } from "../visuals/nodes/tuple_node.js";
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
    console.log("YOU WIN!");
  }

  lose() {
    console.log("YOU LOSE!");
  }

  addTupleNode(
    x: number,
    y: number,
    tupleNodeType: TupleNodeType = "flush",
    tuple?: Card[]
  ): TupleNode {
    return this.renderer.addChild(
      new TupleNode(new Vector2(x, y), tupleNodeType, tuple)
    );
  }

  addLabel(x: number, y: number, text: string): Label {
    return this.renderer.addChild(new Label(new Vector2(x, y), text));
  }

  addButton(x: number, y: number, text: string, disabled?: boolean): Button {
    return this.renderer.addChild(
      new Button(new Vector2(x, y), text, disabled)
    );
  }

  bindButton(id: string, listener: (this: HTMLElement, ev: MouseEvent) => any) {
    document.getElementById(id)?.addEventListener("click", listener);
  }
}
