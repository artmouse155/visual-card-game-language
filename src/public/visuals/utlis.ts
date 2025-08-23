export class Vector2 {
  x: number;
  y: number;

  static get ZERO() {
    return new Vector2(0, 0);
  }

  static get ONE() {
    return new Vector2(1, 1);
  }

  static posInRect(
    rectPos: Vector2,
    rectSize: Vector2,
    testPos: Vector2
  ): boolean {
    const diff = testPos.minus(rectPos);
    return diff.lessThan(rectSize) && Vector2.ZERO.lessThan(diff);
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  minus(other: Vector2): Vector2 {
    return new Vector2(this.x - other.x, this.y - other.y);
  }

  plus(other: Vector2): Vector2 {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  times(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  lessThan(other: Vector2): boolean {
    return this.x < other.x && this.y < other.y;
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}
