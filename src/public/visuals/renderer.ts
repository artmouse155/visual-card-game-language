import { Tuple } from "../logic/tuple.js"; // ts extension gone
import { Label } from "label.js"; // ts extension gone

const BG_IMAGE = "visuals/images/bg.png";

export class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  bgimage: HTMLImageElement = new Image();

  tuples: Array<Tuple> = [];
  labels: Array<Label> = [];

  bgRendered: boolean = false;

  constructor() {
    this.canvas = document.getElementById("VGCLCanvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.loadbg();
  }

  loadbg() {
    if (this.bgRendered) {
      this.ctx.drawImage(this.bgimage, 0, 0);
    } else {
      this.bgimage.addEventListener("load", () => {
        this.ctx.drawImage(this.bgimage, 0, 0);
        this.bgRendered = true;
      });

      this.bgimage.src = BG_IMAGE;
    }
  }

  addTuple(tuple: Tuple) {
    this.tuples.push(tuple);
  }

  addLabel(label: Label) {
    this.labels.push(label);
  }

  render(): void {
    const ctx = this.ctx;
    this.loadbg();

    ctx.clearRect(0, 0, 800, 600);

    ctx.shadowColor = "black";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";

    for (const tuple of this.tuples) {
      let offset_x = 0;
      let offset_y = 0;
      for (const card of tuple) {
        const pos_x = tuple.x + offset_x;
        const pos_y = tuple.y + offset_y;
        ctx.fillStyle = card.faceup ? "#cececeff" : "red";
        ctx.fillRect(pos_x, pos_y, 40, 60);
        offset_x += 0.1;
        offset_y += 0.1;
      }
    }

    for (const label of this.labels) {
      ctx.fillStyle = "black";
      ctx.font = "30px Arial";
      ctx.fillText(label.text, label.x, label.y);
    }
  }
}
