import { Card } from "../../logic/card.js";
import { Orders } from "../../logic/constants.js";
import { Vector2 } from "../utlis.js";
import { CanvasItem } from "./canvas_item.js";
import { Label } from "./label.js";

export class CardNode extends CanvasItem {
  card: Card = new Card(Orders.DEFAULT);

  constructor(position: Vector2, card: Card) {
    super(position, new Vector2(80, 120));
    this.card = card;
    this.draggingEnabled = false;
    this.addChild(new Label(Vector2.ZERO, card.toString(), 25));
  }

  getCard(): Card {
    return this.card;
  }

  _draw(ctx: CanvasRenderingContext2D): void {
    for (const child of this.get_children()) {
      (child as Label).text = this.card.toString();
    }
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowColor = this.hasGlow ? "#000000ff" : "#ffffff00";

    ctx.strokeRect(
      this.globalPosition.x,
      this.globalPosition.y,
      this.size.x,
      this.size.y
    );

    ctx.fillStyle = this.card.faceup ? "#e2e2e2ff" : "#b72121ff";
    ctx.fillRect(
      this.globalPosition.x,
      this.globalPosition.y,
      this.size.x,
      this.size.y
    );

    ctx.shadowColor = "#ffffff00";
  }

  flip(): void {
    this.card.flip();
  }

  _on_mouse_move(
    mousePos: Vector2,
    mouseDelta: Vector2,
    mouseDown: boolean
  ): boolean {
    super._on_mouse_move(mousePos, mouseDelta, mouseDown);
    this.hasGlow = this.hasMouseFocus && this.draggingEnabled;
    return true;
  }
}
