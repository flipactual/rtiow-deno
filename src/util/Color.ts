import Vec3 from "./Vec3.ts";

/** An RGB color */
export default class Color extends Vec3 {
  /** Get the string representation of this Color */
  toString(): string {
    return `${Math.round(255 * this.x)} ${Math.round(255 * this.y)} ${
      Math.round(255 * this.z)
    }`;
  }
}
