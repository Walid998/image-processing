import { Request, Response, Router } from "express";
import { resizeFile, isImageJpg } from "../utilities/fileHandler";

const router = Router();

const paramsValidator = (req: Request, res: Response, next: Function) => {
  if (
    !("filename" in req.query) ||
    !("width" in req.query) ||
    !("height" in req.query)
  ) {
    throw new Error(`you miss to add filename,width or height parameter:
expected url: http://localhost:8083/api/images?filename=<filename.jpg>&width=<300>&height=<300>
    `).message;
  }
  if (!isImageJpg(req.query.filename!.toString())) {
    throw new Error("filename should be .jpg extention").message;
  }
  if (isNaN(+req.query.width!) || isNaN(+req.query.height!)) {
    throw new Error("width and height must be integer").message;
  }

  next();
};

router.get("/images", paramsValidator, async (req, res) => {
  let filename = req.query.filename?.toString() || "";
  let width = parseInt(req.query.width?.toString()!);
  let height = parseInt(req.query.height?.toString()!);
  let filePath: string;
  try {
    filePath = await resizeFile(filename, width, height);
    res.redirect(filePath);
  } catch (err: any) {
    if (err) res.send(err.message);
  }
});

export default router;
