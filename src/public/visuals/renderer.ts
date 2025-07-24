import { Tuple } from "../logic/tuple.js"; // ts extension gone
import { CanvasItem } from "./nodes/canvas_item.js";
import { VCGLNode } from "./nodes/vgcl_node.js";
import { Vector2 } from "./utlis.js";

const BG_IMAGE = "visuals/images/bg.png";

export class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  bgimage: HTMLImageElement = new Image();

  bgRendered: boolean = false;

  root = new CanvasItem(Vector2.ZERO, new Vector2(800, 600));
  oldMousePos = Vector2.ZERO;
  mouseDown = false;

  constructor() {
    this.canvas = document.getElementById("VGCLCanvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    const FPS = 60;

    const processInterval = setInterval(() => {
      this.root._propagate_process(1 / FPS);
      this.render();
    }, 1000 / FPS);

    this.canvas.addEventListener("mousemove", (e) => {
      const newMousePos = new Vector2(e.offsetX, e.offsetY);
      this.root._on_mouse_move(
        newMousePos,
        newMousePos.minus(this.oldMousePos),
        this.mouseDown
      );
      this.oldMousePos = newMousePos;
    });

    // this.canvas.addEventListener("click", (e) => {
    //   this.root._on_click(new Vector2(e.offsetX, e.offsetY));
    // });

    this.canvas.addEventListener("mousedown", (e) => {
      this.mouseDown = true;
      this.root._on_mouse_down(new Vector2(e.offsetX, e.offsetY));
    });

    this.canvas.addEventListener("mouseup", (e) => {
      this.mouseDown = false;
      this.root._on_mouse_up(new Vector2(e.offsetX, e.offsetY));
    });

    this.canvas.addEventListener("mouseleave", (e) => {
      this.root._on_mouse_up(new Vector2(e.offsetX, e.offsetY));
    });

    // To stop it:
    // clearInterval(processInterval);
    this.root._ready();
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

  addChild<Type extends VCGLNode>(node: Type): Type {
    return this.root.addChild(node);
  }

  render(): void {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, 800, 600);

    // ctx.shadowColor = "black";
    // ctx.shadowBlur = 8;
    // ctx.shadowOffsetX = 2;
    // ctx.shadowOffsetY = 2;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";

    this.root._propagate_draw(ctx);
  }
}
