import { Vector2 } from "../utlis.js";
import { VCGLNode } from "./vgcl_node.js";

export class CanvasItem extends VCGLNode {
  _globalPosition: Vector2 = Vector2.ZERO;

  set globalPosition(value: Vector2) {
    const diff = value.minus(this._globalPosition);
    this._globalPosition = value;
    for (const child of this.get_children()) {
      (child as CanvasItem).globalPosition = (
        child as CanvasItem
      ).globalPosition.plus(diff);
    }
  }

  get globalPosition(): Vector2 {
    return this._globalPosition;
  }

  size = Vector2.ZERO;
  scale = Vector2.ONE;

  // option flags
  enable_dragging = false;

  touchingMouse = false;
  dragging = false;

  constructor(globalPosition: Vector2, size: Vector2 = Vector2.ZERO) {
    super();
    this.globalPosition = globalPosition;
    this.size = size;
  }

  _draw(ctx: CanvasRenderingContext2D): void {
    for (const child of this.get_children()) {
      (child as CanvasItem)._draw(ctx);
    }
  }

  _on_mouse_move(mousePos: Vector2, mouseDelta: Vector2, mouseDown: boolean) {
    for (const child of this.get_children()) {
      (child as CanvasItem)._on_mouse_move(mousePos, mouseDelta, mouseDown);
    }
    this.touchingMouse = Vector2.posInRect(
      this.globalPosition,
      this.size,
      mousePos
    );
    if (this.dragging) {
      this.globalPosition = this.globalPosition.plus(mouseDelta);
    }
  }

  _on_click(mousePos: Vector2) {
    for (const child of this.get_children()) {
      (child as CanvasItem)._on_click(mousePos);
    }
  }

  _on_mouse_down(mousePos: Vector2) {
    for (const child of this.get_children()) {
      (child as CanvasItem)._on_mouse_down(mousePos);
    }
    if (this.enable_dragging && this.touchingMouse) {
      this.dragging = true;
    }
  }

  _on_mouse_up(mousePos: Vector2) {
    for (const child of this.get_children()) {
      (child as CanvasItem)._on_mouse_up(mousePos);
    }
    this.dragging = false;
  }

  //     setPos(newPos: Vector2) {
  //         diff = newPos.minus(this.globalPosition);
  //   }
}
