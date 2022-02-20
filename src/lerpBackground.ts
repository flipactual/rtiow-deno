import Color from "./util/Color.ts";
import Point3 from "./util/Point3.ts";
import Ray from "./util/Ray.ts";
import Vec3 from "./util/Vec3.ts";

const e = new TextEncoder();

const stdout = (x: string) => Deno.stdout.write(e.encode(x));
const stderr = (x: string) => Deno.stderr.write(e.encode(x));

// Creates a blue and white lerp background
const rayColor = (r: Ray) => {
  const unitDirection: Vec3 = Vec3.unitVector(r.direction);
  const t = .5 * (unitDirection.y + 1);
  return Color.add(
    Color.multiply(1.0 - t, new Color(1.0, 1.0, 1.0)),
    Color.multiply(t, new Color(0.5, 0.7, 1.0)),
  );
};

(async () => {
  // Image
  const aspectRatio = 16 / 9;
  const imageWidth = 400;
  const imageHeight = imageWidth / aspectRatio;

  // Camera
  const viewportHeight = 2;
  const viewportWidth = aspectRatio * viewportHeight;
  const focalLength = 1;

  const origin = new Point3(0, 0, 0);
  const horizontal = new Vec3(viewportWidth, 0, 0);
  const vertical = new Vec3(0, viewportHeight, 0);
  const lowerLeftCorner = Vec3.subtract(
    Vec3.subtract(
      Vec3.subtract(origin, horizontal.divide(2)),
      vertical.divide(2),
    ),
    new Vec3(0, 0, focalLength),
  );

  await stdout(`P3
${imageWidth} ${imageHeight}
255
`);

  for (let y = imageHeight - 1; y >= 0; y -= 1) {
    await stderr(`\r${y} lines remaining`);
    let line = "";
    for (let x = 0; x < imageWidth; x += 1) {
      const u = x / (imageWidth - 1);
      const v = y / (imageHeight - 1);
      const r = new Ray(
        origin,
        Vec3.subtract(
          lowerLeftCorner.add(Vec3.multiply(u, horizontal)).add(
            Vec3.multiply(v, vertical),
          ),
          origin,
        ),
      );
      line += `${rayColor(r)}
`;
    }
    await stdout(line);
  }
})();
