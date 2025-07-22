import { Vector2 } from "../utlis.js";
import { CanvasItem } from "./canvas_item.js";
import { Label } from "./label.js";

export class Button extends CanvasItem {
  constructor(globalPosition: Vector2, text: string) {
    super(globalPosition, new Vector2(100, 60));
    this.add_child(new Label(globalPosition, text));
  }

  _draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#204da1ff";
    ctx.fillRect(
      this.globalPosition.x,
      this.globalPosition.y,
      this.size.x,
      this.size.y
    );
    super._draw(ctx);
  }
}
