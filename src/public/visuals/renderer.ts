import { Tuple } from "../logic/tuple.js"; // ts extension gone
import { Label } from "label.js"; // ts extension gone

export class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  tuples: Array<Tuple> = [];
  labels: Array<Label> = [];

  bgRendered: boolean = false;

  constructor() {
    this.canvas = document.getElementById("VGCLCanvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(0, 0, 150, 75);
    const img = new Image();

    img.addEventListener("load", () => {
      this.ctx.drawImage(img, 0, 0);
      this.bgRendered = true;
    });

    img.src = "visuals/images/bg.png";
  }

  addTuple(tuple: Tuple) {
    this.tuples.push(tuple);
  }

  addLabel(label: Label) {
    this.labels.push(label);
  }

  render(): void {
    const ctx = this.ctx;
    for (const label of this.labels) {
      ctx.font = "10px Arial";
      ctx.fillText(label.text, label.x, label.y);
    }

    for (const tuple of this.tuples) {
      let offset_x = 0;
      let offset_y = 0;
      for (const card of tuple) {
        const pos_x = tuple.x + offset_x;
        const pos_y = tuple.y + offset_y;
        ctx.fillStyle = card.faceup ? "white" : "red";
        ctx.fillRect(pos_x, pos_y, 20, 30);
        offset_x += 5;
        offset_y += 5;
      }
    }
  }
}
