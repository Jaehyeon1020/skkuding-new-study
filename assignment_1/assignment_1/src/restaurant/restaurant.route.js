const express = require("express");
const router = express.Router();
const {
  getRestaurants,
  getRestaurantByName,
  createRestaurant,
  deleteRestaurantByName,
  updateRestaurantByName,
  restaurantErrorHandler,
} = require("./restaurant.service");

router.get("/", getRestaurants);
router.get("/:name", getRestaurantByName);
router.post("/", createRestaurant);
router.delete("/:name", deleteRestaurantByName);
router.put("/:nameFromParam", updateRestaurantByName);

/** 오류 처리 미들웨어 */
router.use(restaurantErrorHandler);

module.exports = router;
