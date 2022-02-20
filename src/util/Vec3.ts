/** A three-dimensional vector */
export default class Vec3 {
  /** The x coordinate */
  public x: number;
  /** The y coordinate */
  public y: number;
  /** The z coordinate */
  public z: number;
  /** Create a Vec3 that is the sum of two other Vec3s */
  static add(a: Vec3, b: Vec3): Vec3 {
    return new Vec3(a.x + b.x, a.y + b.y, a.z + b.z);
  }
  /** Create a Vec3 that is the difference of two other Vec3s */
  static subtract(a: Vec3, b: Vec3): Vec3 {
    return new Vec3(a.x - b.x, a.y - b.y, a.z - b.z);
  }
  private static multiplyTwoVec3s(a: Vec3, b: Vec3): Vec3 {
    return new Vec3(a.x * b.x, a.y * b.y, a.z * b.z);
  }
  private static multiplyVec3ByNumber(v: Vec3, x: number): Vec3 {
    return new Vec3(v.x * x, v.y * x, v.z * x);
  }
  private static multiplyNumberByVec3(x: number, v: Vec3): Vec3 {
    return Vec3.multiplyVec3ByNumber(v, x);
  }
  static multiply(a: Vec3, b: Vec3): Vec3;
  static multiply(a: Vec3, b: number): Vec3;
  static multiply(a: number, b: Vec3): Vec3;
  /** Create a Vec3 that is the product of two Vec3s or a Vec3 and a number */
  static multiply(a: Vec3 | number, b: Vec3 | number): Vec3 {
    if (typeof a === "number") {
      return Vec3.multiplyNumberByVec3(a, b as Vec3);
    } else if (typeof b === "number") {
      return Vec3.multiplyVec3ByNumber(a, b);
    }
    return Vec3.multiplyTwoVec3s(a, b);
  }
  /** Create a Vec3 that is the quotient of a Vec3 and a number */
  static divide(v: Vec3, x: number): Vec3 {
    return Vec3.multiply(v, 1 / x);
  }
  /** @TODO */
  static dot(a: Vec3, b: Vec3): number {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }
  /** @TODO */
  static cross(a: Vec3, b: Vec3): Vec3 {
    return new Vec3(
      a.y * b.z - a.z * b.y,
      a.z * b.x - a.x * b.z,
      a.x * b.y - a.y * b.x,
    );
  }
  /** @TODO */
  static unitVector(v: Vec3): Vec3 {
    return Vec3.divide(v, v.length());
  }
  /** Create a Vec3 */
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  /** Get the string representation of this Vec3 */
  toString(): string {
    return `${this.x} ${this.y} ${this.z}`;
  }
  /** Add a Vec3 to this Vec3 */
  add(v: Vec3): Vec3 {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }
  /** Multiply this Vec3 by a value */
  multiply(x: number): Vec3 {
    this.x *= x;
    this.y *= x;
    this.z *= x;
    return this;
  }
  /** Divide this Vec3 by a value */
  divide(x: number): Vec3 {
    return this.multiply(1 / x);
  }
  /** Get the length of the Vec3 */
  length(): number {
    return Math.sqrt(this.lengthSquared());
  }
  /** Get the length ** 2 of the Vec3 */
  lengthSquared(): number {
    return this.x ** 2 + this.y ** 2 + this.z ** 2;
  }
}
