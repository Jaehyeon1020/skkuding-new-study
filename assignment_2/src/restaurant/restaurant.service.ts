import { restaurants as restaurantsData } from "./data/restaurants";
import HttpError from "../custom-error/HttpError";
import { Restaurant } from "./data/restaurants";
import express from "express";

/** 이름으로 가게 정보 데이터 가져오기 */
const getRestaurantObjectByName = (name: string): Restaurant | null => {
  for (let restaurant of restaurantsData) {
    // 해당 식당이 존재하면 데이터 반환
    if (restaurant.name === name) {
      return restaurant;
    }
  }

  // 존재하지 않으면 null 반환
  return null;
};

/** 모든 식당 정보 반환 */
export const getRestaurants = (
  req: express.Request,
  res: express.Response
): void => {
  res.send({ ...restaurantsData });
};

/** 특정 식당 정보 반환 */
export const getRestaurantByName = (
  req: express.Request,
  res: express.Response
): void => {
  const { name } = req.params; // 식당 이름
  const restaurantData = getRestaurantObjectByName(name); // 식당 정보 가져오기

  if (restaurantData) {
    // 존재하는 경우 식당 정보 반환
    res.send(restaurantData);
  } else {
    // 일치하는 이름 없는경우 에러 발생
    throw new HttpError("해당 맛집 정보가 존재하지 않습니다.", 404);
  }
};

/** 식당 정보 생성 */
export const createRestaurant = (
  req: express.Request,
  res: express.Response
): void => {
  const { name, address, phone } = req.body;

  // 이미 존재할 경우 에러
  if (getRestaurantObjectByName(name)) {
    throw new HttpError("이미 존재하는 맛집입니다.", 400);
  }

  const newRestaurant = {
    name,
    address,
    phone,
  };

  restaurantsData.push(newRestaurant);
  res.send(newRestaurant);
};

/** 식당 정보 삭제 */
export const deleteRestaurantByName = (
  req: express.Request,
  res: express.Response
): void => {
  const { name } = req.params;
  const deletingRestaurant = getRestaurantObjectByName(name); // 삭제할 식당 정보

  // 삭제할 식당이 없으면 에러 발생
  if (!deletingRestaurant) {
    throw new HttpError("해당 맛집 정보가 존재하지 않습니다.", 404);
  }

  // 식당 정보 삭제
  for (let i = 0; i < restaurantsData.length; i++) {
    if (restaurantsData[i].name === name) {
      restaurantsData.splice(i, 1);
    }
  }

  // 삭제한 식당 정보 반환
  res.send(deletingRestaurant);
};

/** 식당 정보 수정 */
export const updateRestaurantByName = (
  req: express.Request,
  res: express.Response
): void => {
  const { nameFromParam } = req.params;
  const { name, address, phone } = req.body;

  const updatingRestaurant = getRestaurantObjectByName(nameFromParam);

  if (!updatingRestaurant) {
    throw new HttpError("해당 맛집 정보가 존재하지 않습니다.", 404);
  }

  // 식당 정보 수정
  for (let i = 0; i < restaurantsData.length; i++) {
    if (restaurantsData[i].name === nameFromParam) {
      restaurantsData[i].address = address;
      restaurantsData[i].phone = phone;
    }
  }

  res.send({ name, address, phone });
};

/** 오류 처리 핸들러 */
export const restaurantErrorHandler = (
  err: HttpError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.status(err.httpStatusCode).send({ error: err.message });
};
