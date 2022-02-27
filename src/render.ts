import Color from "./util/Color.ts";
import Point3 from "./util/Point3.ts";
import Ray from "./util/Ray.ts";
import Vec3 from "./util/Vec3.ts";
import Hittable from "./util/Hittable.ts";
import HittableList from "./util/HittableList.ts";
import Camera from "./util/Camera.ts";

import Sphere from "./object/Sphere.ts";
import Lambertian from "./material/Lambertian.ts";

const e = new TextEncoder();

const stdout = (x: string) => Deno.stdout.write(e.encode(x));
const stderr = (x: string) => Deno.stderr.write(e.encode(x));

// Creates a blue and white lerp background
const rayColor = (r: Ray, world: Hittable, depth: number): Color => {
  if (depth <= 0) {
    return new Color(0, 0, 0);
  }
  const [hit, rec] = world.hit(r, 0.001, Number.POSITIVE_INFINITY);
  if (hit) {
    const [scatter, attenuation, scattered] = rec.matPtr.scatter(r, rec);
    return scatter
      ? Vec3.multiply(attenuation, rayColor(scattered, world, depth - 1))
      : new Color(0, 0, 0);
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
  const imageWidth = 1080;
  const imageHeight = Math.floor(imageWidth / aspectRatio);
  const samplesPerPixel = 100;
  const depth = 50;

  // World
  const world = new HittableList();

  const materialGround = new Lambertian(new Color(.8, .8, 0));
  const materialCenter = new Lambertian(new Color(.7, .3, 0.3));
  const materialLeft = new Lambertian(new Color(.8, .8, 0.8));
  const materialRight = new Lambertian(new Color(.8, .6, 0.2));

  world.add(new Sphere(new Point3(0, -100.5, -1), 100, materialGround));
  world.add(new Sphere(new Point3(0, 0, -1), 100, materialCenter));
  world.add(new Sphere(new Point3(-1, 0, -1), 100, materialLeft));
  world.add(new Sphere(new Point3(1, 0, -1), 100, materialRight));

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
        color = Color.add(color, rayColor(r, world, depth));
      }
      line += color.string(samplesPerPixel);
    }
    await stdout(line);
  }
})();
