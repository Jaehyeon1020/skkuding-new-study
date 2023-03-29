const express = require("express");
const restaurantRouter = require("./restaurant/restaurant.route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/restaurants", restaurantRouter); // 식당 관련 라우터

app.all("*", (req, res) => {
  res.status(400).send({ error: "잘못된 경로입니다." });
});

app.listen(3000, () => {
  console.log(`서버 작동중`);
});
