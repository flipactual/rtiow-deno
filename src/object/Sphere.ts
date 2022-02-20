import Hittable, { HitRecord } from "../util/Hittable.ts";
import Point3 from "../util/Point3.ts";
import Ray from "../util/Ray.ts";
import Vec3 from "../util/Vec3.ts";

/** A sphere */
export default class Sphere implements Hittable {
  /** The center of the Sphere */
  public center: Point3;
  /** The radius of the Sphere */
  public radius: number;
  /** Create a Sphere */
  constructor(center: Point3, radius: number) {
    this.center = center;
    this.radius = radius;
  }
  /** Calculate if the Sphere is hit by a Ray */
  hit(r: Ray, tMin: number, tMax: number, rec: HitRecord): boolean {
    const oc: Vec3 = r.origin.subtract(this.center);
    const a = r.direction.lengthSquared();
    const halfB = Vec3.dot(oc, r.direction);
    const c = oc.lengthSquared() - this.radius ** 2;

    const discriminant = halfB ** 2 - a * c;
    if (discriminant < 0) return false;
    const sqrtd = Math.sqrt(discriminant);

    let root = (-halfB - sqrtd) / a;
    if (root < tMin || tMax < root) {
      root = (-halfB + sqrtd) / a;
      if (root < tMin || tMax < root) {
        return false;
      }
    }

    rec.t = root;
    rec.p = r.at(rec.t);
    const outwardNormal: Vec3 = (rec.p.subtract(this.center)).divide(
      this.radius,
    );
    rec.frontFace = Vec3.dot(r.direction, outwardNormal) < 0;
    rec.normal = rec.frontFace ? outwardNormal : outwardNormal.multiply(-1);

    return true;
  }
}
