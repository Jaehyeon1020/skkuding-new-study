import express from "express";
import {
  getRestaurants,
  getRestaurantByName,
  createRestaurant,
  deleteRestaurantByName,
  updateRestaurantByName,
  restaurantErrorHandler,
} from "./restaurant.service";

const router = express.Router();

router.get("/", getRestaurants);
router.get("/:name", getRestaurantByName);
router.post("/", createRestaurant);
router.delete("/:name", deleteRestaurantByName);
router.put("/:nameFromParam", updateRestaurantByName);

// 오류처리 미들웨어
router.use(restaurantErrorHandler);

export default router;
