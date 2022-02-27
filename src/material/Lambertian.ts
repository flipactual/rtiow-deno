import Material from "../util/Material.ts";
import Color from "../util/Color.ts";
import Vec3 from "../util/Vec3.ts";
import Ray from "../util/Ray.ts";
import { HitRecord } from "../util/Hittable.ts";

/** Lambertian material */
export default class Lambertian extends Material {
  /** The albedo */
  public albedo: Color;
  /** Create a Lambertian Material */
  constructor(a: Color) {
    super();
    this.albedo = a;
  }
  /** Scatter Ray and calculate attenuation */
  scatter(
    _rIn: Ray,
    rec: HitRecord,
  ): [boolean, Color, Ray] {
    let scatterDirection = Vec3.add(rec.normal, Vec3.randomUnitVector());
    if (Vec3.nearZero(scatterDirection)) {
      scatterDirection = rec.normal;
    }
    return [true, this.albedo, new Ray(rec.p, scatterDirection)];
  }
}
