import Vec3 from "./Vec3.ts";

/** An RGB color */
export class Color extends Vec3 {
  /** Get the string representation of this Color */
  toString(): string {
    return `${Math.floor(255 * this.x)} ${Math.floor(255 * this.y)} ${
      Math.floor(255 * this.z)
    }
`;
  }
}
