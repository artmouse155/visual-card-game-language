import { Card } from "../../logic/card.js";
import { Orders } from "../../logic/constants.js";
import { Vector2 } from "../utlis.js";
import { CanvasItem } from "./canvas_item.js";

export class CardNode extends CanvasItem {
  card: Card = new Card(Orders.DEFAULT);

  constructor(globalPosition: Vector2, card: Card) {
    super(globalPosition, new Vector2(40, 60));
    this.card = card;
  }
}
