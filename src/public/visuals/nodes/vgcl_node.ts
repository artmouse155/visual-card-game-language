export class VCGLNode {
  protected parent: VCGLNode | null = null;
  protected children: Array<VCGLNode> = [];
  protected inTree: boolean = false;
  protected readyCalled: boolean = false;

  /**
   *
   * @param func The function to propagate
   * @param success No idea what this does.
   * @param limitable Can this propogation be limited? For example, when a node is clicked, nodes underneath it don't get the propagation
   * @param reverse Run through in a reverse order
   * @param conditionFunc The condition function for whether a node should have the function called on it
   * @returns
   */
  protected propagate_to_children<Type extends VCGLNode, Return>(
    func: (t: Type) => Return,
    success: Return,
    limitable: boolean = false,
    reverse: boolean = true,
    conditionFunc: (t: Type) => boolean = (t) => {
      return true;
    }
  ): Return {
    const children = [...this.getChildren()];
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

  protected _propagate_add_to_tree(): void {
    this.inTree = true;
    if (!this.readyCalled) {
      this._ready();
    }
    this.propagate_to_children(
      (t: VCGLNode) => {
        return t._propagate_add_to_tree();
      },
      null,
      false,
      true
    );
  }

  protected _ready(): void {
    this.readyCalled = true;
    this.inTree = true;
  }

  protected _propagate_process(delta: number): void {
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

  protected _process(delta: number): void {}

  protected addChild<Type extends VCGLNode>(node: Type): Type {
    this.children.push(node);
    node.parent = this;
    if (this.inTree) {
      node._propagate_add_to_tree();
    }
    return node;
  }

  protected getChildren(): Array<VCGLNode> {
    return this.children;
  }

  protected getParent(): VCGLNode | null {
    return this.parent;
  }

  protected findChildIndex(child: VCGLNode): number {
    const children = this.getChildren();
    for (let i = 0; i < children.length; i++) {
      const foundChild = children[i];
      if (foundChild === child) {
        return i;
      }
    }
    return -1;
  }

  protected reparent(
    child: VCGLNode,
    newParent: VCGLNode,
    destinationIndex?: number
  ): void {
    // Step 1: Find index of the child in the current parent
    const index = this.findChildIndex(child);
    if (index !== -1) {
      this.removeChild(index);
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

  protected removeChild(index: number): VCGLNode {
    return this.children.splice(index, 1)[0];
  }

  protected reorderChild(child: VCGLNode, destinationIndex: number): void {
    // Step 1: Find index of the child in the current parent
    const index = this.findChildIndex(child);
    if (index !== -1) {
      this.removeChild(index);
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

  public toString(): string {
    //   return `{type: "${this.constructor.name}",\t
    //   parent: "${
    //     this.parent?.constructor.name
    //     }",\t
    //   children: [${this.children
    //     .map((child) => child.toString())
    //     .join(", ")}]}`;
    // }

    return `{type: "${this.constructor.name}",\t
    children: [${this.children.map((child) => child.toString()).join(", ")}]}`;
  }
}
