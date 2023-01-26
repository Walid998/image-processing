import express from "express";
import router from "./routes";
import path from "path";

const app = express();
const port = 8083;

app.use("/api", router);

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.listen(port, () => {
  console.log(`server is running now on http://localhost:${port}`);
});

export default app;
