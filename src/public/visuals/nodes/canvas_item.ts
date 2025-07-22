import { Vector2 } from "../utlis.js";
import { VCGLNode } from "./vgcl_node.js";

export class CanvasItem extends VCGLNode {
  globalPosition = Vector2.ZERO;
  size = Vector2.ZERO;
  scale = Vector2.ONE;

  touchingMouse = false;

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

  _on_mouse_move(mousePos: Vector2, mouseDelta: Vector2) {
    for (const child of this.get_children()) {
      (child as CanvasItem)._on_mouse_move(mousePos, mouseDelta);
    }
    this.touchingMouse = Vector2.posInRect(
      this.globalPosition,
      this.size,
      mousePos
    );
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
  }

  _on_mouse_up(mousePos: Vector2) {
    for (const child of this.get_children()) {
      (child as CanvasItem)._on_mouse_up(mousePos);
    }
  }
}
