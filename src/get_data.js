import { checkIconExist } from "./helper";
import sunny from "./images/sun.jpg";
import raining from "./images/raining.jpg";
import cloudy from "./images/cloudy.jpg";
import snow from "./images/snow.jpg";
const content = document.querySelector('.content');
const bgImg = document.querySelector('.bg-img');
let lastBGImg;
let absoluteTemp = 0;
const getData = async (url) => {
    try {
        const resp = await fetch(url);
        if (resp.status >= 200 && resp.status <= 299) {
            const data = await resp.json();
            return data;
        } else {
            throw new Error(resp.statusText);
        }
    } catch (e) {
        if (e.message == "Not Found") {
            alert("can't find that city! try again.");
            content.style.display = "block";
            bgImg.style.backgroundImage = lastBGImg;
        } else {
            throw e;
        }
    }

}
const insertData = function (data) {
    const icon = document.createElement('i');
    const leftPanel = document.querySelector('.left');
    const temp = document.querySelector('.temperature');
    // const precip = document.querySelector('.precip');
    const humid = document.querySelector('.humid');
    const wind = document.querySelector('.wind');
    const city = document.querySelector('.city');
    const info = document.querySelector('.info');
    absoluteTemp = data.main.temp;
    content.style.display = "block";
    switch (data.weather[0].main) {
        case "Rain":
            icon.className = "fa-solid fa-cloud-showers-heavy";
            lastBGImg = `url(${raining}`;
            bgImg.style.backgroundImage = lastBGImg;
            break;
        case "Clear":
            icon.className = "fa-solid fa-sun";
            lastBGImg = `url(${sunny}`;
            bgImg.style.backgroundImage = lastBGImg;
            break;
        case "Clouds":
            icon.className = "fa-solid fa-cloud";
            lastBGImg = `url(${cloudy}`;
            bgImg.style.backgroundImage = lastBGImg;
            break;
        case "Snow":
            icon.className = "fa-solid fa-snowflake";
            lastBGImg = `url(${snow}`;
            bgImg.style.backgroundImage = lastBGImg;
            break;
    }
    checkIconExist();
    leftPanel.insertBefore(icon, leftPanel.firstChild);
    temp.textContent = parseInt((parseFloat(absoluteTemp) - 273.15) * (9 / 5) + 32);
    humid.textContent = `Humidity: ${data.main.humidity} %`;
    wind.textContent = `Wind: ${parseInt(parseFloat(data.wind.speed) * 2.237)} mph`;
    city.textContent = data.name;
    info.textContent = data.weather[0].description;
}
export { getData, insertData, absoluteTemp };