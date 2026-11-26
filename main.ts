// Entry program for news-image-20261125 ("The World Today").
//
// Copies the front-page image this repository holds to the output
// directory make.fun expects, validating it first: PNG signature,
// 1024x1024 dimensions, a complete IEND trailer, and the 1 MiB cap.
// Node 22, standard library only; no network, no randomness, so both
// runs write the same bytes.
import { copyFileSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1_048_576;
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

const here = resolve(fileURLToPath(new URL(".", import.meta.url)));
const source = join(here, "frontpage.png");

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) fail("MAKEFUN_OUTPUT_DIR is not set");

const data = readFileSync(source);
if (data.length > MAX_BYTES) {
  fail(`frontpage.png is ${data.length} bytes, over the ${MAX_BYTES} byte cap`);
}
if (data.length < 8 || !data.subarray(0, 8).equals(PNG_SIGNATURE)) {
  fail("frontpage.png does not start with the PNG signature");
}
if (data.length < 33 || data.toString("ascii", 12, 16) !== "IHDR") {
  fail("frontpage.png has no IHDR chunk where one is expected");
}
if (data.readUInt32BE(8) !== 13 || data.readUInt8(24) !== 8 || data.readUInt8(25) !== 2) {
  fail("frontpage.png IHDR is not a 13-byte header for 8-bit RGB");
}
const width = data.readUInt32BE(16);
const height = data.readUInt32BE(20);
if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
  fail(`frontpage.png is ${width}x${height}, expected ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}`);
}
// The IEND trailer is exactly 12 bytes: length 0, "IEND", and its CRC.
const IEND = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]);
if (!data.subarray(data.length - 12).equals(IEND)) {
  fail("frontpage.png does not end with a complete IEND trailer chunk");
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.png");
copyFileSync(source, target);

const written = statSync(target);
if (written.size !== data.length) {
  fail(`entry.png is ${written.size} bytes, expected ${data.length}`);
}
console.log(`main.ts: wrote ${target} (${written.size} bytes, ${width}x${height})`);
