import { Tuple } from "../../logic/tuple.js";
import { Vector2 } from "../utlis.js";
import { CanvasItem } from "./canvas_item.js";
import { CardNode } from "./card_node.js";

export class TupleNode extends CanvasItem {
  constructor(globalPosition: Vector2, cards: Tuple) {
    super(globalPosition, new Vector2(80, 120));
    for (const card of cards) {
      this.addChild(new CardNode(globalPosition, card));
    }
    this.enableDragging = false;
  }

  _draw(ctx: CanvasRenderingContext2D) {
    // let offset_x = 0;
    // let offset_y = 0;
    // for (const child of this.get_children()) {
    //   const cardNode = child as CardNode;
    //   if (cardNode) {
    //     const pos_x = this.globalPosition.x + offset_x;
    //     const pos_y = this.globalPosition.y + offset_y;
    //     ctx.fillStyle = cardNode.card.faceup ? "#cececeff" : "red";
    //     ctx.fillRect(pos_x, pos_y, this.size.x, this.size.y);
    //     offset_x += 0.1;
    //     offset_y += 0.1;
    //   }
    // }
    ctx.fillStyle = "#c3c3c3ff";
    ctx.fillRect(
      this.globalPosition.x,
      this.globalPosition.y,
      this.size.x,
      this.size.y
    );
    super._draw(ctx); // Draw children
  }
}
