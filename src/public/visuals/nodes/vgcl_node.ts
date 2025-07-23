export class VCGLNode {
  children: Array<VCGLNode> = [];
  inTree: boolean = false;

  propagate_to_children<Type extends VCGLNode, Return>(
    func: (t: Type) => Return,
    success: Return,
    limitable: boolean = false,
    reverse: boolean = true,
    conditionFunc: (t: Type) => boolean = (t) => {
      return true;
    }
  ): Return {
    const children = [...this.get_children()];
    for (const child of reverse ? children.reverse() : children) {
      const typedChild = child as Type;
      if (conditionFunc(typedChild)) {
        const result = func(typedChild);
        if (!result && limitable) {
          return result;
        }
      }
    }
    return success;
  }

  _ready(): void {
    this.inTree = true;
  }

  _propagate_process(delta: number): void {
    this.propagate_to_children(
      (t: VCGLNode) => {
        return t._propagate_process(delta);
      },
      null,
      false,
      true,
      (t: VCGLNode) => {
        return t.inTree;
      }
    );
    this._process(delta);
  }

  _process(delta: number): void {}

  addChild<Type extends VCGLNode>(node: Type): Type {
    this.children.push(node);
    node._ready();
    return node;
  }

  get_children(): Array<VCGLNode> {
    return this.children;
  }
}
