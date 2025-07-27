import { Vector2 } from "../utlis.js";
import { CanvasItem, Rect } from "./canvas_item.js";
import { Label } from "./label.js";

export class Button extends CanvasItem {
  label: Label;

  private _click_callable: CallableFunction = () => {
    console.log("No callable set.");
  };

  disabled: boolean = false;
  set text(value: string) {
    if (this.text != value) {
      this.scheduleResize = true;
    }
    this.label.text = value;
  }

  get text() {
    return this.label.text;
  }

  protected scheduleResize = false;

  constructor(position: Vector2, text: string, disabled?: boolean) {
    super(position, new Vector2(150, 60));
    this.label = new Label(Vector2.ZERO, text);
    this.addChild(new Label(Vector2.ZERO, text));
    if (disabled) {
      this.disabled = disabled;
    }
    this.scheduleResize = true;
  }

  protected _draw(ctx: CanvasRenderingContext2D) {
    if (this.scheduleResize) {
      ctx.font = `${this.label.fontSize}px Verdana`;
      const metrics = ctx.measureText(this.text);

      this.size.x = metrics.width;
      this.size.y =
        metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
      this.scheduleResize = false;
    }
    const rect: Rect = {
      size: this.size,
      padding_x: new Vector2(15, 15),
      padding_y: new Vector2(15, 15),
      border_width: 5,
      corner_radius: 5,
    };
    this.drawRect(
      ctx,
      this.globalPosition,
      rect,
      this.disabled ? "#a3a3a3ff" : "#204da1ff",
      this.disabled ? "#797979ff" : "#1a3d7fff"
    );
    // ctx.fillRect(
    //   this.globalPosition.x,
    //   this.globalPosition.y,
    //   this.size.x,
    //   this.size.y
    // );
  }

  bindClick(fn: CallableFunction): void {
    this._click_callable = fn;
  }

  /**
   * Internal use only. Use bindClick(fn : CallableFunction) instead.
   * @param mousePos
   */
  protected _on_click(mousePos: Vector2): void {
    if (!this.disabled) {
      this._click_callable();
    }
  }
}
