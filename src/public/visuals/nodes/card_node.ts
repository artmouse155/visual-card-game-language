import {
  CARD_SIZE,
  Order,
  Rank,
  Suit,
  SuitEmojis,
} from "../../logic/constants.js";
import { Vector2 } from "../utlis.js";
import { CanvasItem } from "./canvas_item.js";
import { Label } from "./label.js";
import { cardRect } from "./tuple_node.js";

export class CardNode extends CanvasItem {
  faceup = true;
  label: Label;

  constructor() {
    super(Vector2.ZERO, CARD_SIZE);
    this.draggingEnabled = false;
    this.label = this.addChild(new Label(Vector2.ZERO, "", 25));
  }

  protected _draw(ctx: CanvasRenderingContext2D): void {
    // for (const child of this.get_children()) {
    //   (child as Label).text = this.getCardText();
    // }
    this.label.visible = this.faceup;
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowColor = this.hasGlow ? "#000000ff" : "#ffffff00";

    this.drawRect(
      ctx,
      this.globalPosition,
      cardRect,
      this.faceup ? "#e2e2e2ff" : "#b72121ff",
      "#000000ff"
    );

    ctx.shadowColor = "#ffffff00";
  }

  flip(): void {
    this.faceup = !this.faceup;
  }

  setFaceup(faceup: boolean): void {
    this.faceup = faceup;
  }

  // protected _on_mouse_move(
  //   mousePos: Vector2,
  //   mouseDelta: Vector2,
  //   mouseDown: boolean
  // ): boolean {
  //   super._on_mouse_move(mousePos, mouseDelta, mouseDown);
  //   this.hasGlow = this.hasMouseFocus && this.draggingEnabled;
  //   return true;
  // }

  getCardText(): string {
    return "";
  }
}

export class SuitCardNode extends CardNode {
  protected order: Order;
  protected suit: Suit;
  protected rank: Rank;

  constructor(suit: Suit, rank: Rank, order: Order) {
    super();
    this.order = order;
    this.suit = suit;
    this.rank = rank;
    this.label.text = this.getCardText();
  }

  getCardText(): string {
    return `${this.rank}${SuitEmojis[this.suit]} `;
  }

  getOrder(): Order {
    return this.order;
  }
  getSuit(): Suit {
    return this.suit;
  }
  getRank(): Rank {
    return this.rank;
  }

  getSuitValue(): number {
    return this.order.SuitOrder[this.suit];
  }

  getRankValue(): number {
    return this.order.RankOrder[this.rank];
  }

  lessThan(other: SuitCardNode): boolean {
    if (this.getRankValue() === other.getRankValue()) {
      return this.getSuitValue() < other.getSuitValue();
    } else {
      return this.getRankValue() < other.getRankValue();
    }
  }
}

export class JokerCardNode extends CardNode {
  constructor() {
    super();
    this.label.text = this.getCardText();
  }

  getCardText(): string {
    return "JOKER";
  }
}
