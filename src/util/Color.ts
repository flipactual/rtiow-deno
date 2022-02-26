import Vec3 from "./Vec3.ts";
import clamp from "./clamp.ts";

/** An RGB color */
export default class Color extends Vec3 {
  /** Get the string representation of this Color */
  string(samplesPerPixel: number): string {
    const scale = 1 / samplesPerPixel;
    const c = clamp(0, .999);
    return `${
      [
        this.x,
        this.y,
        this.z,
      ].map((x) => Math.round(256 * c(Math.sqrt(x * scale)))).join(" ")
    }
`;
  }
}
