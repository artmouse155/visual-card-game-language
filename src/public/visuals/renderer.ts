import {
  CANVAS_SIZE,
  DEFAULT_GRID_NUM_LINES,
  TILE_SIZE,
} from "../logic/constants.js";
import { CanvasItem } from "./nodes/canvas_item.js";
import { Grid } from "./nodes/grid.js";
import { VCGLNode } from "./nodes/vgcl_node.js";
import { Vector2 } from "./utlis.js";

const BG_IMAGE = "visuals/images/bg.png";

export class Renderer extends CanvasItem {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  bgimage: HTMLImageElement = new Image();

  bgRendered: boolean = false;

  oldMousePos = Vector2.ZERO;
  mouseDown = false;

  constructor() {
    super(Vector2.ZERO, Vector2.ZERO);
    // ONLY RENDERER IS AUTOMATICALLY IN TREE
    this.inTree = true;

    this.canvas = document.getElementById("VGCLCanvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    const FPS = 60;

    const processInterval = setInterval(() => {
      this._propagate_process(1 / FPS);
      this.render();
    }, 1000 / FPS);

    this.canvas.addEventListener("mousemove", (e) => {
      const newMousePos = new Vector2(e.offsetX, e.offsetY);
      this._on_mouse_move(
        newMousePos,
        newMousePos.minus(this.oldMousePos),
        this.mouseDown
      );
      this.oldMousePos = newMousePos;
    });

    this.canvas.addEventListener("mousedown", (e) => {
      this.mouseDown = true;
      this._on_mouse_down(new Vector2(e.offsetX, e.offsetY));
    });

    this.canvas.addEventListener("mouseup", (e) => {
      this.mouseDown = false;
      this._on_mouse_up(new Vector2(e.offsetX, e.offsetY));
    });

    this.canvas.addEventListener("mouseleave", (e) => {
      this._on_mouse_up(new Vector2(e.offsetX, e.offsetY));
    });

    // To stop it:
    // clearInterval(processInterval);
    this._ready();
  }

  protected _ready(): void {
    this.addChild(
      new Grid(TILE_SIZE, DEFAULT_GRID_NUM_LINES, DEFAULT_GRID_NUM_LINES)
    );
  }

  private loadbg() {
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

  public addChild<Type extends VCGLNode>(node: Type): Type {
    return super.addChild(node);
  }

  protected render(): void {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, CANVAS_SIZE.x, CANVAS_SIZE.y);

    // ctx.shadowColor = "black";
    // ctx.shadowBlur = 8;
    // ctx.shadowOffsetX = 2;
    // ctx.shadowOffsetY = 2;

    this.loadbg();

    this._propagate_draw(ctx);
  }
}
