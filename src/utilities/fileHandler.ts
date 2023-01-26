import { existsSync, mkdirSync, promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

export const assetsFullPath = path.resolve("./src/assets/full");
export const assetsThumbPath = path.resolve("./src/assets/thumb");

const OUTPUT_URL_PATH = `/assets/thumb/`;

export function isImageJpg(filename: string) {
  return filename.endsWith(".jpg");
}
export function getOriginalFilePath(filename: string): string {
  return `${assetsFullPath}/${filename}`;
}
export function ensureFileExixts(filePath: string) {
  if (!existsSync(filePath)) {
    throw new Error("file not found");
  }
}

export function fileInCache(filename: string): boolean {
  return existsSync(`${assetsThumbPath}/${filename}`);
}

export function generateOutputUrl(filename: string): string {
  return `${OUTPUT_URL_PATH}${filename}`;
}

export function createFilename(
  filename: string,
  width: number,
  height: number
): string {
  return `${path.parse(filename).name}-${width}-${height}.jpg`;
}

export async function resizeFile(
  filename: string,
  width: number,
  height: number
): Promise<string> {
  if (!existsSync(assetsThumbPath)) mkdirSync(assetsThumbPath);
  const newFilename = createFilename(filename, width, height);
  const outputUrlPath = generateOutputUrl(newFilename);

  if (fileInCache(newFilename)) {
    console.log(
      `this image "${newFilename}" already found in the cache (assets/thumb) directory`
    );
    return outputUrlPath;
  }

  const originalFilePath = getOriginalFilePath(filename);
  ensureFileExixts(originalFilePath);
  let loadedFile: Buffer;
  try {
    loadedFile = await fs.readFile(originalFilePath);
  } catch (err: any) {
    throw err.message;
  }

  try {
    await sharp(loadedFile)
      .resize(width, height)
      .toFile(`${assetsThumbPath}/${newFilename}`);
  } catch (err: any) {
    throw err.message;
  }

  return outputUrlPath;
}
