import { Vector2 } from "../utlis.js";
import { CanvasItem } from "./canvas_item.js";

export class Sprite extends CanvasItem {
  image: HTMLImageElement = new Image();
  scale: Vector2 = Vector2.ONE;
  loaded = false;
  centered = false;

  constructor(
    position: Vector2,
    imagePath: string,
    scale?: Vector2,
    centered?: boolean
  ) {
    super(position, Vector2.ZERO);
    if (scale) {
      this.scale = scale;
    }
    if (centered) {
      centered = true;
    }
    this.image.addEventListener("load", () => {
      this.loaded = true;
      this.size = new Vector2(this.image.width, this.image.height);
    });

    this.image.src = imagePath;
  }

  protected _draw(ctx: CanvasRenderingContext2D): void {
    if (this.loaded) {
      const drawPos = this.globalPosition.minus(
        this.centered ? this.size.times(0.5) : Vector2.ZERO
      );
      ctx.drawImage(
        this.image,
        drawPos.x,
        drawPos.y,
        this.size.x * this.scale.x,
        this.size.y * this.scale.y
      );
    }
  }
}
