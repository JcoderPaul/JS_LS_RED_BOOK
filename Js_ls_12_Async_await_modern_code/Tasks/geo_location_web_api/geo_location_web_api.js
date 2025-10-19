'use strict';

/*
Получить геолокацию пользователя через Geolocation.getCurrentPosition() (WebAPI)
и по координатам определить город, отпраив запрос:
https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=00&longitude=00
*/

function getCoordinates() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude
        });
      },
      (err) => {
        reject(err);
      } 
    );
  });
}

async function getMyCity(){
  try {
    const { latitude, longitude } = await getCoordinates();
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`);
    if(!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    console.log(data);
  } catch(err) {
    console.error(err);
  }
}

getMyCity(); // {latitude: ..., lookupSource: 'coordinates', longitude: ..., …, } и в параметре 'locality:' мы найдем город/село

