import { Vector2 } from "../utlis.js";
import { CanvasItem } from "./canvas_item.js";

export class Grid extends CanvasItem {
  protected cellSize: Vector2;
  protected horizontalLineCount: number;
  protected verticalLineCount: number;
  protected lineLength: number = 1000;

  constructor(
    cellSize: Vector2,
    horizontalLineCount: number,
    verticalLineCount: number
  ) {
    super(Vector2.ZERO);
    this.cellSize = cellSize;
    this.horizontalLineCount = horizontalLineCount;
    this.verticalLineCount = verticalLineCount;
  }

  protected _draw(ctx: CanvasRenderingContext2D): void {
    for (let i = 0; i < this.verticalLineCount; i++) {
      ctx.beginPath();
      const startX = this.position.x + i * this.cellSize.x;
      ctx.moveTo(startX, 0);
      ctx.lineTo(startX, this.lineLength);
      ctx.strokeStyle = "#ee0000ac";
      ctx.stroke();
    }

    for (let i = 0; i < this.horizontalLineCount; i++) {
      ctx.beginPath();
      const startY = this.position.y + i * this.cellSize.y;
      ctx.moveTo(0, startY);
      ctx.lineTo(this.lineLength, startY);
      ctx.strokeStyle = "#000000ac";
      ctx.stroke();
    }
  }
}
