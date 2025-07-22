import { Tuple } from "./tuple.js"; // ts extension gone
import { Label } from "../visuals/label.js"; // ts extension gone

export class Game {
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  tuples: Array<Tuple> = [];
  labels: Array<Label> = [];

  constructor() {
    this.canvas = document.getElementById("VGCLCanvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(0, 0, 150, 75);
    const img = new Image();

    img.addEventListener("load", () => {
      this.ctx?.drawImage(img, 0, 0);
    });

    img.src = "visuals/images/bg.png";
  }

  play() {}

  win() {
    console.log("YOU LOSE!");
  }

  lose() {
    console.log("YOU WIN!");
  }

  add(visualElement: Tuple | Label) {}
}
