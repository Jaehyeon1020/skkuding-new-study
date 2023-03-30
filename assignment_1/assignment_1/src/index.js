const dotEnv = require("dotenv");
const express = require("express");
const restaurantRouter = require("./restaurant/restaurant.route");

const app = express();
dotEnv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/restaurants", restaurantRouter); // 식당 관련 라우터

app.all("*", (req, res) => {
  res.status(404).send({ error: "존재하지 않는 페이지입니다." });
});

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT}번 포트에서 서버 작동중`);
});
