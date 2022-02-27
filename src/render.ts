import Color from "./util/Color.ts";
import Point3 from "./util/Point3.ts";
import Ray from "./util/Ray.ts";
import Vec3 from "./util/Vec3.ts";
import Hittable from "./util/Hittable.ts";
import HittableList from "./util/HittableList.ts";
import Camera from "./util/Camera.ts";

import Sphere from "./object/Sphere.ts";
import Lambertian from "./material/Lambertian.ts";
import Metal from "./material/Metal.ts";
import Dielectric from "./material/Dielectric.ts";

import randomInRange from "./util/randomInRange.ts";

const e = new TextEncoder();

const stdout = (x: string) => Deno.stdout.write(e.encode(x));
const stderr = (x: string) => Deno.stderr.write(e.encode(x));

// Creates a random scene
const randomScene = (): HittableList => {
  const world = new HittableList();

  const groundMaterial = new Lambertian(new Color(0.5, 0.5, 0.5));
  world.add(new Sphere(new Point3(0, -1000, 0), 1000, groundMaterial));

  for (let a = -11; a < 11; a += 1) {
    for (let b = -11; b < 11; b += 1) {
      const chooseMat = Math.random();
      const center = new Point3(
        a + 0.9 * Math.random(),
        0.2,
        b + 0.9 * Math.random(),
      );

      if (Vec3.subtract(center, new Point3(4, 0.2, 0)).length() > 0.9) {
        if (chooseMat < 0.8) {
          // diffuse
          const albedo = Vec3.multiply(Color.random(0, 1), Color.random(0, 1));
          world.add(new Sphere(center, 0.2, new Lambertian(albedo)));
        } else if (chooseMat < 0.95) {
          // metal
          const albedo = Color.random(0.5, 1);
          const fuzz = randomInRange(0, 0.5);
          world.add(
            new Sphere(center, 0.2, new Metal(albedo, fuzz)),
          );
        } else {
          // glass
          world.add(new Sphere(center, 0.2, new Dielectric(1.5)));
        }
      }
    }
  }

  // auto material1 = make_shared<dielectric>(1.5);
  // world.add(make_shared<sphere>(point3(0, 1, 0), 1.0, material1));

  // auto material2 = make_shared<lambertian>(color(0.4, 0.2, 0.1));
  // world.add(make_shared<sphere>(point3(-4, 1, 0), 1.0, material2));

  // auto material3 = make_shared<metal>(color(0.7, 0.6, 0.5), 0.0);
  // world.add(make_shared<sphere>(point3(4, 1, 0), 1.0, material3));

  return world;
};

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
  const imageWidth = 1200;
  const imageHeight = Math.floor(imageWidth / aspectRatio);
  const samplesPerPixel = 100;
  const depth = 50;

  // World
  const world = randomScene();

  // Camera
  const lookFrom = new Point3(13, 2, 3);
  const lookAt = new Point3(0, 0, 0);
  const vup = new Vec3(0, 1, 0);
  const distToFocus = 10;
  const aperture = 0.1;

  const cam = new Camera(
    lookFrom,
    lookAt,
    vup,
    20,
    aspectRatio,
    aperture,
    distToFocus,
  );

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
