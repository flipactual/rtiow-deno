import Material from "../util/Material.ts";
import Color from "../util/Color.ts";
import Vec3 from "../util/Vec3.ts";
import Ray from "../util/Ray.ts";
import { HitRecord } from "../util/Hittable.ts";

/** Dielectric material */
export default class Dielectric extends Material {
  /** The index of refraction */
  public ir: number;
  /** Create a Dielectric Material */
  constructor(indexOfRefraction: number) {
    super();
    this.ir = indexOfRefraction;
  }
  scatter(
    rIn: Ray,
    rec: HitRecord,
  ): [boolean, Color, Ray] {
    const attenuation = new Color(1, 1, 1);
    const refractionRatio = rec.frontFace ? 1 / this.ir : this.ir;

    const unitDirection = Vec3.unitVector(rIn.direction);
    const cosTheta = Math.min(
      Vec3.dot(Vec3.multiply(unitDirection, -1), rec.normal),
      1,
    );
    const sinTheta = Math.sqrt(1 - cosTheta ** 2);

    const cannotRefract = refractionRatio * sinTheta > 1;

    const direction = cannotRefract
      ? Vec3.reflect(unitDirection, rec.normal)
      : Vec3.refract(unitDirection, rec.normal, refractionRatio);

    const scattered = new Ray(rec.p, direction);
    return [true, attenuation, scattered];
  }
}
