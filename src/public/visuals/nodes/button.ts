import { Vector2 } from "../utlis.js";
import { CanvasItem } from "./canvas_item.js";
import { Label } from "./label.js";

export class Button extends CanvasItem {
  _click_callable: CallableFunction = () => {
    console.log("No callable set.");
  };

  disabled: boolean = false;

  constructor(position: Vector2, text: string, disabled?: boolean) {
    super(position, new Vector2(150, 60));
    this.addChild(new Label(Vector2.ZERO, text));
    if (disabled) {
      this.disabled = disabled;
    }
  }

  _draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.disabled ? "#a3a3a3ff" : "#204da1ff";
    ctx.fillRect(
      this.globalPosition.x,
      this.globalPosition.y,
      this.size.x,
      this.size.y
    );
  }

  bindClick(fn: CallableFunction): void {
    this._click_callable = fn;
  }

  /**
   * Internal use only. Use bindClick(fn : CallableFunction) instead.
   * @param mousePos
   */
  _on_click(mousePos: Vector2): void {
    if (!this.disabled) {
      this._click_callable();
    }
  }
}
