const fs = require("fs");

const restaurantsFile = fs.readFileSync("./restaurants.json", "utf8");
const restaurantsJson = JSON.parse(restaurantsFile);
const restaurants = restaurantsJson.restaurants; // 식당 정보 담겨있는 배열

const name = process.argv[2];
const address = process.argv[3];
const phone = process.argv[4];

let isModified = false; // 정보 수정이 일어났는지 체크
for (let data of restaurants) {
  if (data.name === name) {
    data.address = address;
    data.phone = phone;
    isModified = true;
    break;
  }
}

if (isModified) {
  fs.writeFileSync("./restaurants.json", JSON.stringify(restaurantsJson)); // json 파일에 쓰기
  console.log("처리되었습니다.");
} else {
  console.log("해당 맛집 정보가 존재하지 않습니다.");
}
