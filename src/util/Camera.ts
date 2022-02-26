import Point3 from "./Point3.ts";
import Vec3 from "./Vec3.ts";
import Ray from "./Ray.ts";

/** A camera */
export default class Camera {
  /** The aspect ratio */
  private aspectRatio: number;
  /** The viewport height */
  private viewportHeight: number;
  /** The viewport width */
  private viewportWidth: number;
  /** The focal length */
  private focalLength: number;
  /** The origin */
  public origin: Point3;
  /** The horizontal */
  public horizontal: Vec3;
  /** The vertical */
  public vertical: Vec3;
  /** The lower left corner */
  public lowerLeftCorner: Vec3;
  /** Create a Camera */
  constructor() {
    this.aspectRatio = 16 / 9;
    this.viewportHeight = 2;
    this.viewportWidth = this.aspectRatio * this.viewportHeight;
    this.focalLength = 1;

    this.origin = new Point3(0, 0, 0);
    this.horizontal = new Vec3(this.viewportWidth, 0, 0);
    this.vertical = new Vec3(0, this.viewportHeight, 0);
    this.lowerLeftCorner = Vec3.subtract(
      Vec3.subtract(
        Vec3.subtract(this.origin, Vec3.divide(this.horizontal, 2)),
        Vec3.divide(this.vertical, 2),
      ),
      new Vec3(0, 0, this.focalLength),
    );
  }
  getRay(u: number, v: number): Ray {
    return new Ray(
      this.origin,
      Vec3.add(
        Vec3.add(this.lowerLeftCorner, Vec3.multiply(u, this.horizontal)),
        Vec3.multiply(v, this.vertical),
      ),
    );
  }
}
