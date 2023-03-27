const fs = require("fs");

const restaurantsFile = fs.readFileSync("./restaurants.json", "utf8");
const restaurantsJson = JSON.parse(restaurantsFile);
const restaurants = restaurantsJson.restaurants; // 식당 정보 담겨있는 배열

const name = process.argv[2];

const filteredRestaurants = restaurants.filter((data) => data.name !== name); // 해당하는 가게 정보 삭제

if (filteredRestaurants.length === restaurants.length) {
  console.log("해당 맛집 정보가 존재하지 않습니다.");
} else {
  restaurantsJson.restaurants = filteredRestaurants;
  fs.writeFileSync("./restaurants.json", JSON.stringify(restaurantsJson)); // json 파일에 쓰기
  console.log("처리되었습니다.");
}
