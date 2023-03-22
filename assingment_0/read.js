const fs = require("fs");

const restaurantsFile = fs.readFileSync("./restaurants.json", "utf8");
const restaurantsJson = JSON.parse(restaurantsFile);

console.log();

for (let restaurantData of restaurantsJson.restaurants) {
  console.log("이름: ", restaurantData.name);
  console.log("주소: ", restaurantData.address);
  console.log("번호: ", restaurantData.phone);
  console.log();
}
