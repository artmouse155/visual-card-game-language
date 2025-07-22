import { Vector2 } from "../utlis.js";
import { CanvasItem } from "./canvas_item.js";

export class Label extends CanvasItem {
  text: string = "";

  mouseDown = false;
  dragging = false;

  constructor(globalPosition: Vector2, text: string) {
    super(globalPosition, new Vector2(100, 100));
    this.text = text;
  }

  // _process(delta: number): void {
  //   this.globalPosition.x += 5 * delta;
  //   this.globalPosition.y += 5 * delta;
  // }

  _draw(ctx: CanvasRenderingContext2D): void {
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
  }

  _on_mouse_move(mousePos: Vector2, mouseDelta: Vector2) {
    super._on_mouse_move(mousePos, mouseDelta);
    if (this.dragging) {
      this.globalPosition = this.globalPosition.plus(mouseDelta);
    }
  }

  _on_mouse_down(mousePos: Vector2): void {
    super._on_mouse_down(mousePos);
    this.mouseDown = true;
    if (this.touchingMouse) {
      this.dragging = true;
    }
  }

  _on_mouse_up(mousePos: Vector2): void {
    super._on_mouse_up(mousePos);
    this.mouseDown = false;
    this.dragging = false;
  }
}
