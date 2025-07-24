import { Vector2 } from "../utlis.js";
import { CanvasItem } from "./canvas_item.js";

export class Label extends CanvasItem {
  _text: string = "";
  fontSize: number = 30;

  set text(value: string) {
    if (this._text != value) {
      this.scheduleResize = true;
    }
    this._text = value;
  }

  get text() {
    return this._text;
  }

  scheduleResize = false;

  constructor(position: Vector2, text: string, fontSize?: number) {
    super(position, new Vector2(100, 100));
    this.text = text;
    this.FocusEnabled = false;
    if (fontSize) {
      this.fontSize = fontSize;
    }
  }

  _draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "black";
    ctx.font = `${this.fontSize}px Arial`;

    if (this.scheduleResize) {
      const metrics = ctx.measureText(this.text);

      this.size.x = metrics.width;
      this.size.y =
        metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
      this.scheduleResize = false;
    }

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
  }
}
