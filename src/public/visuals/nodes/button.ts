import { Vector2 } from "../utlis.js";
import { CanvasItem } from "./canvas_item.js";
import { Label } from "./label.js";

export class Button extends CanvasItem {
  _click_callable: CallableFunction = () => {
    console.log("No callable set.");
  };

  constructor(globalPosition: Vector2, text: string) {
    super(globalPosition, new Vector2(150, 60));
    this.addChild(new Label(globalPosition, text));
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

  bindClick(fn: CallableFunction): void {
    this._click_callable = fn;
  }

  /**
   * Internal use only. Use bindClick(fn : CallableFunction) instead.
   * @param mousePos
   */
  _on_click(mousePos: Vector2): void {
    this._click_callable();
  }
}
