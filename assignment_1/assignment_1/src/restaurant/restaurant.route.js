const express = require("express");
const router = express.Router();
const {
  getRestaurants,
  getRestaurantByName,
  createRestaurant,
  deleteRestaurantByName,
  updateRestaurantByName,
} = require("./restaurant.service");

router.get("/", getRestaurants);
router.get("/:name", getRestaurantByName);
router.post("/", createRestaurant);
router.delete("/:name", deleteRestaurantByName);
router.put("/:nameFromParam", updateRestaurantByName);

module.exports = router;
