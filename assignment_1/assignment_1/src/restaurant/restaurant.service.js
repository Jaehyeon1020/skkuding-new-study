const fs = require("fs");
const path = require("path");
const HttpError = require("./custom-error/HttpError");

const dataPath = path.join(__dirname, "/data/restaurants.json");

const restaurantsFile = fs.readFileSync(dataPath, "utf8");
const restaurantsJson = JSON.parse(restaurantsFile);
const restaurants = restaurantsJson.restaurants; // 식당 정보 담겨있는 배열

/** 주어진 이름의 맛집 인덱스 찾기, 없으면 -1 반환 */
const getIndexOfRestaurentByName = (name, restaurants) => {
  for (let i = 0; i < restaurants.length; i++) {
    if (restaurants[i].name === name) {
      return i;
    }
  }

  return -1;
};

/** 모든 식당 정보 반환 */
exports.getRestaurants = (req, res) => {
  res.send(restaurantsJson);
};

/** 특정 식당 정보 반환 */
exports.getRestaurantByName = (req, res) => {
  const { name } = req.params; // 식당 이름
  const restaurantIndex = getIndexOfRestaurentByName(name, restaurants);

  if (restaurantIndex === -1) {
    throw new HttpError("해당 맛집 정보가 존재하지 않습니다.", 404);
  }

  res.send(restaurants[restaurantIndex]);
};

/** 식당 정보 생성 */
exports.createRestaurant = (req, res) => {
  const { name, address, phone } = req.body;

  if (getIndexOfRestaurentByName(name, restaurants) !== -1) {
    throw new HttpError("이미 해당 맛집 정보가 존재합니다.", 400);
  }

  const newRestaurant = { name, address, phone };
  restaurants.push(newRestaurant);

  fs.writeFileSync(dataPath, JSON.stringify(restaurantsJson));

  res.send(newRestaurant);
};

/** 식당 정보 삭제 */
exports.deleteRestaurantByName = (req, res) => {
  const { name } = req.params;
  const restaurantIndex = getIndexOfRestaurentByName(name, restaurants);

  if (restaurantIndex === -1) {
    throw new HttpError("해당 맛집 정보가 존재하지 않습니다.", 404);
  }

  const deletedRestaurant = { ...restaurants[restaurantIndex] };
  restaurants.splice(restaurantIndex, 1);

  fs.writeFileSync(dataPath, JSON.stringify(restaurantsJson));

  res.send(deletedRestaurant);
};

/** 식당 정보 수정 */
exports.updateRestaurantByName = (req, res) => {
  const { nameFromParam } = req.params;
  const { name, address, phone } = req.body;
  const restaurantIndex = getIndexOfRestaurentByName(name, restaurants);

  if (restaurantIndex === -1) {
    throw new HttpError("해당 맛집 정보가 존재하지 않습니다.", 404);
  }

  const updatedRestaurant = { name, address, phone };
  restaurants[restaurantIndex] = updatedRestaurant;

  fs.writeFileSync(dataPath, JSON.stringify(restaurantsJson));

  res.send(updatedRestaurant);
};

/** 오류 처리 핸들러 */
exports.restaurantErrorHandler = (err, req, res, next) => {
  res.status(err.httpStatusCode).send({ error: err.message });
};
