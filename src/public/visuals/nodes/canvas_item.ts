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
  dragged = false; // true if dragging moved this node

  constructor(globalPosition: Vector2, size: Vector2 = Vector2.ZERO) {
    super();
    this.globalPosition = globalPosition;
    this.size = size;
  }

  _draw(ctx: CanvasRenderingContext2D): void {
    this.propagate_to_children((t: CanvasItem) => {
      return t._draw(ctx);
    }, null);
  }

  propagate_to_children<Type extends VCGLNode, Return>(
    func: (t: Type) => Return,
    success: Return,
    limitable: boolean = false
  ): Return {
    for (const child of this.get_children()) {
      const typeChild = child as Type;
      const result = func(typeChild);
      if (!result && limitable) {
        return result;
      }
    }
    return success;
  }

  _on_mouse_move(
    mousePos: Vector2,
    mouseDelta: Vector2,
    mouseDown: boolean
  ): boolean {
    // Boolean return tells us if we can continue
    for (const child of this.get_children()) {
      if (
        !(child as CanvasItem)._on_mouse_move(mousePos, mouseDelta, mouseDown)
      ) {
        return false;
      }
    }
    this.touchingMouse = Vector2.posInRect(
      this.globalPosition,
      this.size,
      mousePos
    );
    if (this.dragging) {
      this.dragged = true;
      this.globalPosition = this.globalPosition.plus(mouseDelta);
      return false;
    }
    return true;
  }

  _on_click(mousePos: Vector2): boolean {
    return this.propagate_to_children((t: CanvasItem) => {
      return t._on_click(mousePos);
    }, true);
  }

  _on_mouse_down(mousePos: Vector2): boolean {
    // Boolean return tells us if we can continue
    if (
      !this.propagate_to_children((t: CanvasItem) => {
        return t._on_mouse_down(mousePos);
      }, true)
    ) {
      return false;
    }
    if (this.enable_dragging && this.touchingMouse) {
      this.dragging = true;
      return false;
    }
    return true;
  }

  _on_mouse_up(mousePos: Vector2): boolean {
    // Boolean return tells us if we can continue
    if (
      !this.propagate_to_children((t: CanvasItem) => {
        return t._on_mouse_up(mousePos);
      }, true)
    ) {
      return false;
    }
    this.dragged = false;
    this.dragging = false;
    return true;
  }
}
