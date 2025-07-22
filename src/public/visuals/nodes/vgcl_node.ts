export class VCGLNode {
  children: Array<VCGLNode> = [];

  _ready(): void {}

  _process(delta: number): void {
    for (const child of this.get_children()) {
      child._process(delta);
    }
  }

  add_child(node: VCGLNode): void {
    this.children.push(node);
  }

  get_children(): Array<VCGLNode> {
    return this.children;
  }
}
