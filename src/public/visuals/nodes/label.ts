import { Vector2 } from "../utlis.js";
import { CanvasItem } from "./canvas_item.js";

export class Label extends CanvasItem {
  _text: string = "";

  set text(value: string) {
    this._text = value;
    this.scheduleResize = true;
  }

  get text() {
    return this._text;
  }

  scheduleResize = false;

  constructor(globalPosition: Vector2, text: string) {
    super(globalPosition, new Vector2(100, 100));
    this.text = text;
    this.enableFocus = false;
  }

  _draw(ctx: CanvasRenderingContext2D): void {
    if (this.scheduleResize) {
      const metrics = ctx.measureText(this.text);
      this.size.x = metrics.width;
      this.size.y =
        metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
      this.scheduleResize = false;
    }

    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    // ctx.strokeRect(
    //   this.globalPosition.x,
    //   this.globalPosition.y,
    //   this.size.x,
    //   this.size.y
    // );
    ctx.fillText(
      this.text,
      this.globalPosition.x,
      this.globalPosition.y + this.size.y
    );
    super._draw(ctx);
  }
}
