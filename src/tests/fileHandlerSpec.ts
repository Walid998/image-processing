import {
  createFilename,
  ensureFileExixts,
  fileInCache,
  getOriginalFilePath,
} from "../utilities/fileHandler";

describe("file existance", () => {
  it("throw exception if the image doesn't exixts", () => {
    const filename = "anyfile.jpg";
    const originalFilePath = getOriginalFilePath(filename);
    expect(function () {
      ensureFileExixts(originalFilePath);
    }).toThrowError("file not found");
  });
});

describe("file name foramt", () => {
  it("filename like: filename-width-height.jpg", () => {
    const filename = "anyfile.jpg";
    const width = 230;
    const height = 200;
    const createdFilename = createFilename(filename, width, height);
    expect(createdFilename).toEqual("anyfile-230-200.jpg");
  });
});

describe("Cache Suite", () => {
  it("file is not found in cache", async () => {
    const filename = "anyfile.jpg";
    expect(fileInCache(filename)).toBeFalse();
  });
});
