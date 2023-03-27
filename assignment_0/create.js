const fs = require("fs");

const restaurantsFile = fs.readFileSync("./restaurants.json", "utf8");
const restaurantsJson = JSON.parse(restaurantsFile);
const restaurants = restaurantsJson.restaurants; // 식당 정보 담겨있는 배열

const name = process.argv[2];
const address = process.argv[3];
const phone = process.argv[4];

/** 해당 맛집이 이미 등록되어있는지 확인 */
const isRestaurantExist = (name, restaurants) => {
  for (let data of restaurants) {
    if (data.name === name) {
      return true;
    }
  }
  return false;
};

if (isRestaurantExist(name, restaurants)) {
  console.log("이미 존재하는 맛집입니다.");
} else {
  restaurants.push({
    name: process.argv[2],
    address: process.argv[3],
    phone: process.argv[4],
  }); /* 실행시 인자로 받은 정보 저장 */

  fs.writeFileSync("./restaurants.json", JSON.stringify(restaurantsJson)); // json 파일에 쓰기
  console.log("처리되었습니다.");
}
