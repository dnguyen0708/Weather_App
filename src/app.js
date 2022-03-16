import "./form_reset.css";
import './style.css';
import sunny from "./images/sun.jpg";
import raining from "./images/raining.jpg";
import cloudy from "./images/cloudy.jpg";
import snow from "./images/snow.jpg";
import loading from "./images/loading-100.gif";
import { tempConvertC, tempConvertF } from "./tempConvertion";
const bgImg = document.querySelector('.bg-img');
const searchBtn = document.querySelector(".searchBtn");
const unitToggleF = document.querySelector(".fahrenheit");
const unitToggleC = document.querySelector(".celcius");
let absoluteTemp = 0;
let url = "http://api.openweathermap.org/data/2.5/weather?q=Sacramento&APPID=352af670c848dc23fc755682c4022f19";

const getData = async (url) => {
    try {
        const resp = await fetch(url);
        if (resp.status >= 200 && resp.status <= 299) {
            const data = await resp.json();
            insertData(data);
        } else {
            throw new Error(resp.statusText);
        }
    } catch (e) {
        if (e.message == "Not Found") {
            alert("can't find that city! try again.");
            document.body.style.display = "block";
            bgImg.style.backgroundImage = "none";
        } else {
            throw e;
        }
    }

}

function checkIconExist() {
    const icon = document.querySelector('.left .fa-solid');
    if (icon) {
        const leftPanel = document.querySelector('.left');
        leftPanel.removeChild(icon);
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
    bgImg.style.backgroundSize = "cover";
    document.body.style.display = "block";
    switch (data.weather[0].main) {
        case "Rain":
            icon.className = "fa-solid fa-cloud-showers-heavy";
            bgImg.style.backgroundImage = `url(${raining}`;
            break;
        case "Clear":
            icon.className = "fa-solid fa-sun";
            bgImg.style.backgroundImage = `url(${sunny}`;
            break;
        case "Clouds":
            icon.className = "fa-solid fa-cloud";
            bgImg.style.backgroundImage = `url(${cloudy}`;
            break;
        case "Snow":
            icon.className = "fa-solid fa-snowflake";
            bgImg.style.backgroundImage = `url(${snow}`;
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
function fetchData() {
    const query = document.querySelector("#city");
    if (query.value) {
        bgImg.style.backgroundImage = `url(${loading}`;
        bgImg.style.backgroundSize = "auto";
        document.body.style.display = "none";
        url = `http://api.openweathermap.org/data/2.5/weather?q=${query.value.replace(/\s/g, "")}&APPID=352af670c848dc23fc755682c4022f19`;
        getData(url);
        query.value = '';
    }
}
function enterKeyPressed(e) {
    if (e.key == "Enter") {
        fetchData();
    }
}
// getData(url);
unitToggleC.addEventListener('click', () => tempConvertC(absoluteTemp));
unitToggleF.addEventListener('click', () => tempConvertF(absoluteTemp));
searchBtn.addEventListener('click', fetchData);
document.body.addEventListener('keypress', enterKeyPressed);