import {
  CARD_SIZE,
  CARD_RECT,
  Order,
  Rank,
  Suit,
  SuitEmojis,
  CARD_IMAGE_SCALE,
  SUIT_CARD_TEXTURE_MAP,
} from "../../logic/constants.js";
import { Vector2 } from "../utlis.js";
import { CanvasItem } from "./canvas_item.js";
import { Label } from "./label.js";
import { Sprite } from "./sprite.js";

const PLACEHOLDER_CARD_TEXTURE = "visuals/images/cards/placeholder.png";
const CARD_BACK = "visuals/images/cards/back.png";

export class Card extends CanvasItem {
  faceup = true;
  // label: Label;
  frontSprite: Sprite;
  backSprite: Sprite;

  constructor() {
    super(Vector2.ZERO, CARD_SIZE);
    this.draggingEnabled = false;
    this.frontSprite = new Sprite(
      Vector2.ZERO,
      PLACEHOLDER_CARD_TEXTURE,
      CARD_IMAGE_SCALE
    );
    this.backSprite = new Sprite(Vector2.ZERO, CARD_BACK, CARD_IMAGE_SCALE);
    this.addChild(this.frontSprite);
    this.addChild(this.backSprite);
    // this.label = this.addChild(new Label(Vector2.ZERO, "", 25));
  }

  protected _draw(ctx: CanvasRenderingContext2D): void {
    this.frontSprite.visible = this.faceup;
    this.backSprite.visible = !this.faceup;
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowColor = this.hasGlow ? "#000000ff" : "#ffffff00";

    this.drawRect(
      ctx,
      this.globalPosition,
      CARD_RECT,
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

  protected getImagePath(): string {
    return PLACEHOLDER_CARD_TEXTURE;
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

  public toString(): string {
    return this.getCardText();
  }

  getCardText(): string {
    return "";
  }
}

export class SuitCard extends Card {
  protected order: Order;
  protected suit: Suit;
  protected rank: Rank;

  constructor(suit: Suit, rank: Rank, order: Order) {
    super();
    this.order = order;
    this.suit = suit;
    this.rank = rank;
    // this.label.text = this.getCardText();
    this.frontSprite.setImage(this.getImagePath());
  }

  protected getImagePath(): string {
    return SUIT_CARD_TEXTURE_MAP[this.suit as Suit][this.rank as Rank];
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

  lessThan(other: SuitCard): boolean {
    if (this.getRankValue() === other.getRankValue()) {
      return this.getSuitValue() < other.getSuitValue();
    } else {
      return this.getRankValue() < other.getRankValue();
    }
  }
}

export class JokerCard extends Card {
  constructor() {
    super();
    // this.label.text = this.getCardText();
    this.frontSprite.setImage(this.getImagePath());
  }

  protected getImagePath(): string {
    return "visuals/images/cards/joker.png";
  }

  getCardText(): string {
    return "JOKER";
  }
}
