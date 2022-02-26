import Color from "./util/Color.ts";
import Point3 from "./util/Point3.ts";
import Ray from "./util/Ray.ts";
import Vec3 from "./util/Vec3.ts";
import Hittable from "./util/Hittable.ts";
import HittableList from "./util/HittableList.ts";
import Camera from "./util/Camera.ts";

import Sphere from "./object/Sphere.ts";

const e = new TextEncoder();

const stdout = (x: string) => Deno.stdout.write(e.encode(x));
const stderr = (x: string) => Deno.stderr.write(e.encode(x));

// Creates a blue and white lerp background
const rayColor = (r: Ray, world: Hittable) => {
  const [hit, rec] = world.hit(r, 0, Number.POSITIVE_INFINITY);
  if (hit) {
    return Color.multiply(0.5, Color.add(rec.normal, new Color(1, 1, 1)));
  }
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
  const samplesPerPixel = 100;

  // World
  const world = new HittableList();
  world.add(new Sphere(new Point3(0, 0, -1), .5));
  world.add(new Sphere(new Point3(0, -100.5, -1), 100));

  // Camera
  const cam = new Camera();

  await stdout(`P3
${imageWidth} ${imageHeight}
255
`);

  for (let y = imageHeight - 1; y >= 0; y -= 1) {
    await stderr(`\r${y} lines remaining`);
    let line = "";
    for (let x = 0; x < imageWidth; x += 1) {
      let color: Color = new Color(0, 0, 0);
      for (let _s = 0; _s < samplesPerPixel; _s += 1) {
        const u = (x + Math.random()) / (imageWidth - 1);
        const v = (y + Math.random()) / (imageHeight - 1);
        const r = cam.getRay(u, v);
        color = Color.add(color, rayColor(r, world));
      }
      line += color.string(samplesPerPixel);
    }
    await stdout(line);
  }
})();
