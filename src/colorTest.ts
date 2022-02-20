import Color from "./util/Color.ts";

const e = new TextEncoder();

const stdout = (x: string) => Deno.stdout.write(e.encode(x));
const stderr = (x: string) => Deno.stderr.write(e.encode(x));

const imageWidth = 255;
const imageHeight = 255;

await stdout(`P3
${imageWidth} ${imageHeight}
255
`);

for (let y = imageHeight - 1; y >= 0; y -= 1) {
  await stderr(`\r${y} lines remaining`);
  for (let x = 0; x < imageWidth; x += 1) {
    await stdout(
      `${new Color(x / (imageWidth - 1), y / (imageHeight - 1), .25)}
`,
    );
  }
}
