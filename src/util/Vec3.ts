/** A three-dimensional vector */
export default class Vec3 {
  /** Create a Vec3 that is the sum of two other Vec3s */
  static add<T extends Vec3>(a: T, b: T): T {
    return Reflect.construct(a.constructor, [a.x + b.x, a.y + b.y, a.z + b.z]);
  }
  /** Create a Vec3 that is the difference of two other Vec3s */
  static subtract<T extends Vec3>(a: T, b: T): T {
    return Reflect.construct(a.constructor, [a.x - b.x, a.y - b.y, a.z - b.z]);
  }
  private static multiplyTwoVec3s<T extends Vec3>(a: T, b: T): T {
    return Reflect.construct(a.constructor, [a.x * b.x, a.y * b.y, a.z * b.z]);
  }
  private static multiplyVec3ByNumber<T extends Vec3>(v: T, x: number): T {
    return Reflect.construct(v.constructor, [v.x * x, v.y * x, v.z * x]);
  }
  private static multiplyNumberByVec3<T extends Vec3>(x: number, v: T): T {
    return Vec3.multiplyVec3ByNumber(v, x);
  }
  static multiply<T extends Vec3>(a: T, b: T): T;
  static multiply<T extends Vec3>(a: T, b: number): T;
  static multiply<T extends Vec3>(a: number, b: T): T;
  /** Create a Vec3 that is the product of two Vec3s or a Vec3 and a number */
  static multiply<T extends Vec3>(a: T | number, b: T | number): T {
    if (typeof a === "number") {
      return Vec3.multiplyNumberByVec3(a, b as T);
    } else if (typeof b === "number") {
      return Vec3.multiplyVec3ByNumber(a, b);
    }
    return Vec3.multiplyTwoVec3s(a, b);
  }
  /** Create a Vec3 that is the quotient of a Vec3 and a number */
  static divide<T extends Vec3>(v: T, x: number): T {
    return Vec3.multiply(v, 1 / x);
  }
  /** Get the dot product of two Vec3s */
  static dot<T extends Vec3>(a: T, b: T): number {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }
  /** Get the cross product of two Vec3s */
  static cross<T extends Vec3>(a: T, b: T): T {
    return Reflect.construct(a.constructor, [
      a.y * b.z - a.z * b.y,
      a.z * b.x - a.x * b.z,
      a.x * b.y - a.y * b.x,
    ]);
  }
  /** Get the unit vector of a Vec3 */
  static unitVector<T extends Vec3>(v: T): T {
    return Vec3.divide(v, v.length());
  }
  /** The Vec3's x coordinate */
  public x: number;
  /** The Vec3's y coordinate */
  public y: number;
  /** The Vec3's z coordinate */
  public z: number;
  /** Create a Vec3 */
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  /** Get the string representation of this Vec3 */
  string(_?: unknown): string {
    return `${Math.round(255 * this.x)} ${Math.round(255 * this.y)} ${
      Math.round(255 * this.z)
    }`;
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
