import express from "express";
const app = express();
const port = 8083;

app.use("/", (req, res) => {
  res.send("Hello My Project");
});

app.listen(port, () => {
  console.log(`server is running now on http://localhost:${port}`);
});
