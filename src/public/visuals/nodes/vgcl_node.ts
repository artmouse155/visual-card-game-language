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
    // TODO: Fix this! Should only call _ready() if we are in the tree. _ready() should only be called once
    node._ready();
    return node;
  }

  get_children(): Array<VCGLNode> {
    return this.children;
  }

  reparent(
    child: VCGLNode,
    newParent: VCGLNode,
    destinationIndex?: number
  ): void {
    // Step 1: Find index of the child in the current parent
    let index = 0;
    let found = false;
    const children = this.get_children();
    for (index = 0; index < children.length; index++) {
      const foundChild = children[index];
      if (foundChild === child) {
        found = true;
        break;
      }
    }
    if (found) {
      this.children.splice(index, 1);
      newParent.addChild(child);
      if (destinationIndex) {
        newParent.reorderChild(child, destinationIndex);
      }
    } else {
      console.error(
        "Tried to reparent child",
        child,
        ". Child not found in parent",
        this
      );
    }
  }

  reorderChild(child: VCGLNode, destinationIndex: number): void {
    // Step 1: Find index of the child in the current parent
    let index = 0;
    let found = false;
    const children = this.get_children();
    for (index = 0; index < children.length; index++) {
      const foundChild = children[index];
      if (foundChild === child) {
        found = true;
        break;
      }
    }
    if (found) {
      this.children.splice(index, 1);
      this.children.splice(destinationIndex, 0, child);
    } else {
      console.error(
        "Tried to reorder child",
        child,
        ". Child not found in parent",
        this
      );
    }
  }
}
