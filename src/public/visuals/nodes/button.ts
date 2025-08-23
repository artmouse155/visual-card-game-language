import { Vector2 } from "../utlis.js";
import { CanvasItem, Rect } from "./canvas_item.js";
import { Label } from "./label.js";

export class Button extends CanvasItem {
  private label: Label;
  private padding_x = 15;
  private padding_y = 5;

  private _click_callable: CallableFunction = () => {
    console.log("No callable set.");
  };

  _disabled: boolean = false;

  set disabled(value: boolean) {
    this._disabled = value;
    this.label.fontColor = this._disabled ? "#282828ff" : "#000000ff";
  }

  get disabled() {
    return this._disabled;
  }

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
    super(position, Vector2.ZERO);
    this.label = new Label(
      new Vector2(this.padding_x, this.padding_y),
      text,
      20
    );
    this.addChild(this.label);
    if (disabled) {
      this.disabled = disabled;
    }
    this.scheduleResize = true;
  }

  protected _draw(ctx: CanvasRenderingContext2D) {
    if (this.scheduleResize) {
      ctx.font = `${this.label.fontSize}px Verdana`;
      const metrics = ctx.measureText(this.text);

      this.size.x = metrics.width + this.padding_x * 2;
      this.size.y =
        metrics.fontBoundingBoxAscent +
        metrics.fontBoundingBoxDescent +
        this.padding_y * 2;
      this.scheduleResize = false;
    }
    const rect: Rect = {
      size: this.size,
      border_width: 0,
      corner_radius: 2,
    };
    this.drawRect(
      ctx,
      this.globalPosition,
      rect,
      this.disabled ? "#2626264d" : "#f0f0f0ff",
      this.disabled ? "#282828ff" : "#000000ff"
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
