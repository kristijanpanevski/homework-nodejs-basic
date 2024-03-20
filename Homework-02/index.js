import express from "express";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();

app.use(express.json());

app.listen(PORT, HOST, () => {
  console.log(`Server is up at port ${PORT}`);
});
