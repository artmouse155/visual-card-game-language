import { Card } from "../../logic/card.js";
import { Orders } from "../../logic/constants.js";
import { Vector2 } from "../utlis.js";
import { CanvasItem } from "./canvas_item.js";
import { Label } from "./label.js";

export class CardNode extends CanvasItem {
  card: Card = new Card(Orders.DEFAULT);

  constructor(globalPosition: Vector2, card: Card) {
    super(globalPosition, new Vector2(80, 120));
    this.card = card;
    this.enable_dragging = true;
    this.add_child(new Label(globalPosition, card.toString()));
  }

  _draw(ctx: CanvasRenderingContext2D): void {
    for (const child of this.get_children()) {
      (child as Label).text = this.card.toString();
    }

    ctx.fillStyle = this.card.faceup ? "#aad5a2ff" : "red";
    ctx.fillRect(
      this.globalPosition.x,
      this.globalPosition.y,
      this.size.x,
      this.size.y
    );
    super._draw(ctx);
  }

  _process(delta: number): void {
    super._process(delta);
    if (this.dragged) console.log("bam");
  }

  _on_click(mousePos: Vector2): boolean {
    super._on_click(mousePos);
    if (this.touchingMouse && !this.dragged) {
      this.card.flip();
      return false;
    }
    return true;
  }
}
