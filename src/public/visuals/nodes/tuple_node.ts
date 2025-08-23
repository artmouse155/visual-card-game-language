import { STAGGER_DISTANCE } from "../../logic/constants.js";
import { Vector2 } from "../utlis.js";
import { CanvasItem, Rect } from "./canvas_item.js";
import { Card } from "./card_node.js";
import { VCGLNode } from "./vgcl_node.js";

export type TupleTileDisplayMode =
  | "flush"
  | "staggered"
  | "staggered_right"
  | "centered_staggered"
  | "centered_staggered_right";

export const cardRect: Rect = {
  size: new Vector2(80, 120),
  padding_x: Vector2.ZERO,
  padding_y: Vector2.ZERO,
  border_width: 2,
  corner_radius: 5,
};

// const tupleNodeTypeOffsets: Record<TupleNodeType, Vector2> = {
//   drawpile: new Vector2(0, 0),
//   hand: new Vector2(40, 0),
//   staggered: new Vector2(0, 10),
//   staggered_right: new Vector2(20, 0),
// };

export class TupleTile extends CanvasItem {
  protected displayMode: TupleTileDisplayMode = "flush";

  public getCards(): Card[] {
    let out: Card[] = [];
    for (const child of this.get_children()) {
      const cardChild = child as Card;
      if (cardChild) {
        out.push(cardChild);
      }
    }
    return out;
  }

  constructor(
    position: Vector2,
    tupleNodeType?: TupleTileDisplayMode,
    cards?: Card[]
  ) {
    super(position, cardRect.size);
    if (cards) {
      for (const card of cards) {
        this.addChild(card);
      }
    }
    if (tupleNodeType) {
      this.displayMode = tupleNodeType;
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
    const cardNodes = this.getCards();
    let initialOffset = Vector2.ZERO;
    let cardSpacing = Vector2.ZERO;
    switch (this.displayMode) {
      case "flush":
        cardSpacing = Vector2.ZERO;
        break;
      case "staggered":
        cardSpacing = new Vector2(0, STAGGER_DISTANCE.y);
        break;
      case "staggered_right":
        cardSpacing = new Vector2(STAGGER_DISTANCE.x, 0);
        break;
      case "centered_staggered":
        cardSpacing = new Vector2(0, STAGGER_DISTANCE.y);
        initialOffset = new Vector2(
          0,
          ((cardNodes.length - 1) * STAGGER_DISTANCE.y) / 2
        );
        break;
      case "centered_staggered_right":
        cardSpacing = new Vector2(STAGGER_DISTANCE.x, 0);
        initialOffset = new Vector2(
          ((cardNodes.length - 1) * STAGGER_DISTANCE.x) / 2,
          0
        );
        break;
    }

    for (let index = 0; index < cardNodes.length; index++) {
      cardNodes[index].position = initialOffset.plus(cardSpacing.times(index));
    }
  }

  moveCard(
    conditionFunc: (c: Card, index: number) => boolean,
    destination: TupleTile,
    indexFunc?: (c: Card, index: number, cards: Card[]) => number,
    flipCard?: boolean,
    reverseChildren?: boolean
  ): void {
    const cards = this.getCards();
    if (reverseChildren) {
      cards.reverse();
    }
    let index = 0;
    let found = false;
    for (index = 0; index < cards.length; index++) {
      const card = cards[index];
      if (conditionFunc(card, index)) {
        found = true;
        break;
      }
    }
    if (found) {
      const cardNode = cards[index];
      if (indexFunc) {
        this.reparent(
          cardNode,
          destination,
          indexFunc(cardNode, index, destination.getCards())
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
    destination: TupleTile,
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
    destination: TupleTile,
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

    let temp: TupleTile = new TupleTile(Vector2.ZERO);
    while (this.getCards().length > 0) {
      const index = randInRange(0, this.getCards().length);
      temp.addChild(this.removeChild(index));
    }
    while (temp.getCards().length > 0) {
      this.addChild(temp.removeChild(0));
    }
  }

  flip(): void {
    this.reverse();
    for (const cardNode of this.getCards()) {
      cardNode.flip();
    }
  }

  reverse(): void {
    const cardNodes = this.getCards();
    for (const cardNode of this.getCards()) {
      this.reorderChild(cardNode, 0);
    }
  }
}
