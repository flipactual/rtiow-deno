import Vec3 from "./Vec3.ts";
import Point3 from "./Point3.ts";

/** A ray */
export default class Ray {
  /** The Ray's origin */
  public A: Point3;
  /** The Ray's direction */
  public b: Vec3;
  /** Create a Ray */
  constructor(A: Point3, b: Vec3) {
    this.A = A;
    this.b = b;
  }
  /** Get the value at a position on the Ray */
  at(t: number): Point3 {
    return Point3.add(this.A, Vec3.multiply(t, this.b));
  }
}
