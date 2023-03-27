const express = require("express");
const restaurantRouter = require("./restaurant/restaurant.route");

const app = express();

app.use("/restaurants", restaurantRouter); // 식당 관련 라우터

app.listen(3000, () => {
  console.log(`서버 작동중`);
});
