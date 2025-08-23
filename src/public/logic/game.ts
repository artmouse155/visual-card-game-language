import { Label } from "../visuals/nodes/label.js"; // ts extension gone
import { Renderer } from "../visuals/renderer.js";
import { TupleTile, TupleTileDisplayMode } from "../visuals/nodes/tuple.js";
import { Vector2 } from "../visuals/utlis.js";
import { Button } from "../visuals/nodes/button.js";
import { Card } from "../visuals/nodes/card.js";

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
    tupleNodeType: TupleTileDisplayMode = "flush",
    tuple?: Card[]
  ): TupleTile {
    return this.renderer.addChild(
      new TupleTile(new Vector2(x, y), tupleNodeType, tuple)
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
