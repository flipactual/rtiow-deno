import Point3 from "./Point3.ts";
import Vec3 from "./Vec3.ts";
import Ray from "./Ray.ts";

import degreesToRadians from "./degreesToRadians.ts";

/** A camera */
export default class Camera {
  /** The origin */
  public origin: Point3;
  /** The horizontal */
  public horizontal: Vec3;
  /** The vertical */
  public vertical: Vec3;
  /** The lower left corner */
  public lowerLeftCorner: Vec3;
  /** Create a Camera */
  constructor(
    lookFrom: Point3,
    lookAt: Point3,
    vup: Vec3,
    vfov: number,
    aspectRatio: number,
  ) {
    const theta = degreesToRadians(vfov);
    const h = Math.tan(theta / 2);
    const viewportHeight = 2 * h;
    const viewportWidth = aspectRatio * viewportHeight;

    const w = Vec3.unitVector(Vec3.subtract(lookFrom, lookAt));
    const u = Vec3.unitVector(Vec3.cross(vup, w));
    const v = Vec3.cross(w, u);

    this.origin = lookFrom;
    this.horizontal = Vec3.multiply(viewportWidth, u);
    this.vertical = Vec3.multiply(viewportHeight, v);
    this.lowerLeftCorner = Vec3.subtract(
      Vec3.subtract(
        Vec3.subtract(this.origin, Vec3.divide(this.horizontal, 2)),
        Vec3.divide(this.vertical, 2),
      ),
      w,
    );
  }
  /** Get a Ray from the Camera */
  getRay(s: number, t: number): Ray {
    return new Ray(
      this.origin,
      Vec3.subtract(
        Vec3.add(
          Vec3.add(
            this.lowerLeftCorner,
            Vec3.multiply(s, this.horizontal),
          ),
          Vec3.multiply(t, this.vertical),
        ),
        this.origin,
      ),
    );
  }
}
