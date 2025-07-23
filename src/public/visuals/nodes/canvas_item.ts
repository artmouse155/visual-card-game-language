import { Vector2 } from "../utlis.js";
import { VCGLNode } from "./vgcl_node.js";

export class CanvasItem extends VCGLNode {
  _parentGlobalPosition: Vector2 = Vector2.ZERO;
  // _scheduleChildrenGlobalPositionUpdate = true;
  _position: Vector2 = Vector2.ZERO;

  set globalPosition(value: Vector2) {
    const diff = value.minus(this.globalPosition);
    this.position = this.position.plus(diff);
  }

  get globalPosition(): Vector2 {
    return this._parentGlobalPosition.plus(this.position);
  }

  set position(value: Vector2) {
    this._position = value;
    this.updateChildrenGlobalPosition();
  }

  get position() {
    return this._position;
  }

  updateChildrenGlobalPosition() {
    for (const child of this.get_children()) {
      (child as CanvasItem)._parentGlobalPosition = this.globalPosition;
    }
  }

  size = Vector2.ZERO;
  scale = Vector2.ONE;

  hasGlow = false;

  // option flags
  draggingEnabled = false;
  FocusEnabled = true; // Required for enable_dragging
  get canDrag() {
    return this.draggingEnabled && this.FocusEnabled;
  }

  isTouchingMouse = false;
  hasMouseFocus = false;
  get canFocus() {
    return this.FocusEnabled && this.visible;
  }

  dragged = false; // true if dragging moved this node

  visible = true;

  constructor(position: Vector2, size: Vector2 = Vector2.ZERO) {
    super();
    this.position = position;
    this.size = size;
  }

  show(): void {
    this.visible = true;
  }

  hide(): void {
    this.visible = false;
  }

  _propagate_draw(ctx: CanvasRenderingContext2D): void {
    this._draw(ctx); // Draw our children after us
    this.propagate_to_children(
      (t: CanvasItem) => {
        return t._propagate_draw(ctx);
      },
      null,
      false,
      false,
      (t: CanvasItem) => {
        return t.inTree && t.visible;
      }
    );
  }

  // addChild<Type extends VCGLNode>(node: Type): Type {
  //   super.addChild(node);
  //   this.updateChildrenGlobalPosition();
  //   return node;
  // }
  _ready(): void {
    super._ready();
    // TODO: To fix this, make this a propagated function / recursive.
    this.updateChildrenGlobalPosition();
  }

  // Pretends like we moved a bit when whe first start to make it so that our children
  _draw(ctx: CanvasRenderingContext2D): void {
    // if (this._scheduleChildrenGlobalPositionUpdate) {
    //   this.updateChildrenGlobalPosition();
    //   this._scheduleChildrenGlobalPositionUpdate = false;
    // }
  }

  _on_mouse_move(
    mousePos: Vector2,
    mouseDelta: Vector2,
    mouseDown: boolean
  ): boolean {
    // Boolean return tells us if we can continue
    if (
      !this.propagate_to_children(
        (t: CanvasItem) => {
          return t._on_mouse_move(mousePos, mouseDelta, mouseDown);
        },
        true,
        true
      )
    ) {
      return false;
    }
    this.isTouchingMouse = Vector2.posInRect(
      this.globalPosition,
      this.size,
      mousePos
    );
    if (this.canDrag && this.hasMouseFocus) {
      this.dragged = true;
      this.position = this.position.plus(mouseDelta);
      return false;
    }
    return true;
  }

  _on_click(mousePos: Vector2): void {}

  _on_mouse_down(mousePos: Vector2): boolean {
    // Boolean return tells us if we can continue
    if (
      !this.propagate_to_children(
        (t: CanvasItem) => {
          return t._on_mouse_down(mousePos);
        },
        true,
        true
      )
    ) {
      return false;
    }
    if (this.canFocus && this.isTouchingMouse) {
      this.hasMouseFocus = true;
      return false;
    }
    return true;
  }

  _on_mouse_up(mousePos: Vector2): boolean {
    // Boolean return tells us if we can continue
    if (
      !this.propagate_to_children(
        (t: CanvasItem) => {
          return t._on_mouse_up(mousePos);
        },
        true,
        true
      )
    ) {
      return false;
    }
    if (this.isTouchingMouse && this.hasMouseFocus && !this.dragged) {
      this._on_click(mousePos);
    }
    this.dragged = false;
    this.hasMouseFocus = false;
    return true;
  }
}
