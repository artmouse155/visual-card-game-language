import { Vector2 } from "../utlis.js";
import { CanvasItem } from "./canvas_item.js";

export class Label extends CanvasItem {
  text: string = "";

  scheduleResize = false;

  constructor(globalPosition: Vector2, text: string) {
    super(globalPosition, new Vector2(100, 100));
    this.text = text;
    this.enable_dragging = false;
    this.scheduleResize = true;
  }

  _draw(ctx: CanvasRenderingContext2D): void {
    // TODO: Move this somewhere else
    const metrics = ctx.measureText(this.text);
    if (this.scheduleResize) {
      this.size.x = metrics.width;
      this.size.y =
        metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
      this.scheduleResize = false;
    }

    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.strokeRect(
      this.globalPosition.x,
      this.globalPosition.y,
      this.size.x,
      this.size.y
    );
    ctx.fillText(
      this.text,
      this.globalPosition.x,
      this.globalPosition.y + this.size.y
    );
    super._draw(ctx);
  }
}
