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
    this.draggingEnabled = true;
    this.addChild(new Label(globalPosition, card.toString()));
  }

  _draw(ctx: CanvasRenderingContext2D): void {
    for (const child of this.get_children()) {
      (child as Label).text = this.card.toString();
    }
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowColor = this.hasGlow ? "#000000ff" : "#ffffff00";

    ctx.fillStyle = this.card.faceup ? "#aad5a2ff" : "red";
    ctx.fillRect(
      this.globalPosition.x,
      this.globalPosition.y,
      this.size.x,
      this.size.y
    );

    ctx.shadowColor = "#ffffff00";
  }

  _on_click(mousePos: Vector2): void {
    this.card.flip();
  }

  _on_mouse_move(
    mousePos: Vector2,
    mouseDelta: Vector2,
    mouseDown: boolean
  ): boolean {
    super._on_mouse_move(mousePos, mouseDelta, mouseDown);
    this.hasGlow = this.hasMouseFocus;
    return true;
  }
}
