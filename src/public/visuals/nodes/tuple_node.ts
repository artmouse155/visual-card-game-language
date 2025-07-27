import { Card } from "../../logic/card.js";
import { Vector2 } from "../utlis.js";
import { CanvasItem, Rect } from "./canvas_item.js";
import { CardNode } from "./card_node.js";
import { VCGLNode } from "./vgcl_node.js";

export type TupleNodeType =
  | "drawpile"
  | "hand"
  | "staggered"
  | "staggered_right";

export const cardRect: Rect = {
  size: new Vector2(80, 120),
  padding_x: Vector2.ZERO,
  padding_y: Vector2.ZERO,
  border_width: 2,
  corner_radius: 5,
};

const tupleNodeTypeOffsets: Record<TupleNodeType, Vector2> = {
  drawpile: new Vector2(0, 0),
  hand: new Vector2(40, 0),
  staggered: new Vector2(0, 10),
  staggered_right: new Vector2(20, 0),
};

export class TupleNode extends CanvasItem {
  protected tupleNodeType: TupleNodeType = "drawpile";

  protected getCardNodes(): CardNode[] {
    let out: CardNode[] = [];
    for (const child of this.get_children()) {
      const cardChild = child as CardNode;
      if (cardChild) {
        out.push(cardChild);
      }
    }
    return out;
  }

  constructor(
    position: Vector2,
    tupleNodeType?: TupleNodeType,
    cards?: Card[]
  ) {
    super(position, cardRect.size);
    if (cards) {
      for (const card of cards) {
        this.addChild(new CardNode(Vector2.ZERO, card));
      }
    }
    if (tupleNodeType) {
      this.tupleNodeType = tupleNodeType;
    }
    this.updateCardPositions();
  }

  protected addChild<Type extends VCGLNode>(node: Type): Type {
    super.addChild(node);
    this.updateCardPositions();
    return node;
  }

  protected removeChild(index: number): VCGLNode {
    const node = super.removeChild(index);
    this.updateCardPositions();
    return node;
  }

  getCards(): Card[] {
    return this.getCardNodes().map((c: CardNode) => {
      return c.getCard();
    });
  }

  protected getSize(): number {
    return this.getCards().length;
  }

  protected _draw(ctx: CanvasRenderingContext2D) {
    this.drawRect(ctx, this.globalPosition, cardRect, "#1818187e");
  }
  /**
   * Finds the first card that meets the condition, and moves it to the destination TupleNode based on the result of running indexFunc
   * @param conditionFunc
   * @param destination
   * @param indexFunc
   * @param flipCard
   * @param reverseChildren
   */

  protected updateCardPositions(): void {
    const cardNodes = this.getCardNodes();
    const cardSpacing = tupleNodeTypeOffsets[this.tupleNodeType];
    for (let index = 0; index < cardNodes.length; index++) {
      cardNodes[index].position = new Vector2(
        index * cardSpacing.x,
        index * cardSpacing.y
      );
    }
  }

  moveCard(
    conditionFunc: (c: Card, index: number) => boolean,
    destination: TupleNode,
    indexFunc?: (c: Card, index: number, cards: Card[]) => number,
    flipCard?: boolean,
    reverseChildren?: boolean
  ): void {
    const cardNodes = this.getCardNodes();
    if (reverseChildren) {
      cardNodes.reverse();
    }
    let index = 0;
    let found = false;
    for (index = 0; index < cardNodes.length; index++) {
      const cardNode = cardNodes[index];
      if (conditionFunc(cardNode.getCard(), index)) {
        found = true;
        break;
      }
    }
    if (found) {
      const cardNode = cardNodes[index];
      if (indexFunc) {
        this.reparent(
          cardNode,
          destination,
          indexFunc(cardNode.getCard(), index, destination.getCards())
        );
      } else {
        this.reparent(cardNode, destination);
      }
      if (flipCard) {
        cardNode.flip();
      }
    } else {
      console.error(
        `No card found in tupleNode ${this} matching condition ${conditionFunc}`
      );
    }
  }

  reveal(
    destination: TupleNode,
    count: number = 1,
    reverseChildren?: boolean
  ): void {
    for (let index = 0; index < count; index++) {
      const thisPileSize = this.getSize();
      this.moveCard(
        (c: Card, index: number) => {
          return index == thisPileSize - 1;
        },
        destination,
        undefined,
        true
      );
    }
  }

  draw(
    destination: TupleNode,
    count: number = 1,
    reverseChildren?: boolean
  ): void {
    for (let index = 0; index < count; index++) {
      const thisPileSize = this.getSize();
      this.moveCard(
        (c: Card, index: number) => {
          return index == thisPileSize - 1;
        },
        destination,
        undefined,
        false
      );
    }
  }

  shuffle(): void {
    const randInRange = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    let temp: TupleNode = new TupleNode(Vector2.ZERO);
    while (this.getCardNodes().length > 0) {
      const index = randInRange(0, this.getCardNodes().length);
      temp.addChild(this.removeChild(index));
    }
    while (temp.getCardNodes().length > 0) {
      this.addChild(temp.removeChild(0));
    }
  }

  flip(): void {
    this.reverse();
    for (const cardNode of this.getCardNodes()) {
      cardNode.flip();
    }
  }

  reverse(): void {
    const cardNodes = this.getCardNodes();
    for (const cardNode of this.getCardNodes()) {
      this.reorderChild(cardNode, 0);
    }
  }
}
