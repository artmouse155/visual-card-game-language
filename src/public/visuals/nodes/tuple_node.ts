import { Card } from "../../logic/card.js";
import { Tuple } from "../../logic/tuple.js";
import { Vector2 } from "../utlis.js";
import { CanvasItem } from "./canvas_item.js";
import { CardNode } from "./card_node.js";

export class TupleNode extends CanvasItem {
  cardSpacing = 5;

  get cardNodes(): CardNode[] {
    let out: CardNode[] = [];
    for (const child of this.get_children()) {
      const cardChild = child as CardNode;
      if (cardChild) {
        out.push(cardChild);
      }
    }
    return out;
  }

  constructor(position: Vector2, cards: Card[]) {
    super(position, new Vector2(80, 120));
    for (const card of cards) {
      this.addChild(new CardNode(Vector2.ZERO, card));
    }
    this.draggingEnabled = false;
  }

  getCards(): Card[] {
    return this.cardNodes.map((c: CardNode) => {
      return c.getCard();
    });
  }

  getSize(): number {
    return this.getCards().length;
  }

  _draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#c3c3c3ff";
    ctx.fillRect(
      this.globalPosition.x,
      this.globalPosition.y,
      this.size.x,
      this.size.y
    );
  }
  /**
   * Finds the first card that meets the condition, and moves it to the destination TupleNode based on the result of running indexFunc
   * @param conditionFunc
   * @param destination
   * @param indexFunc
   * @param flipCard
   * @param reverseChildren
   */

  _process(delta: number): void {
    const cardNodes = this.cardNodes;
    for (let index = 0; index < cardNodes.length; index++) {
      cardNodes[index].position = new Vector2(
        cardNodes[index].position.x,
        index * this.cardSpacing
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
    const cardNodes = this.cardNodes;
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
        cardNode.getCard().flip();
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
}
