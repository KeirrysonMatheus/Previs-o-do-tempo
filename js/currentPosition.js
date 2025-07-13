import { getDataByCoord, WeatherAPIKey } from "./api.js";
function getPos() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
        console.log(position)
        getDataByCoord(position, WeatherAPIKey)
      },
      (error) => {
        reject(error);
      }
    );
  });
}


export{ getPos }