import "./form_reset.css";
import './style.css';
import loading from "./images/loading-100.gif";
import { tempConvertC, tempConvertF } from "./tempConvertion";
import { getData, insertData, absoluteTemp } from "./get_data";
const searchBtn = document.querySelector(".searchBtn");
const unitToggleF = document.querySelector(".fahrenheit");
const unitToggleC = document.querySelector(".celcius");
const content = document.querySelector('.content');
const bgImg = document.querySelector('.bg-img');
let url = "http://api.openweathermap.org/data/2.5/weather?q=Sacramento&APPID=352af670c848dc23fc755682c4022f19";

const data = getData(url);
data.then(d => insertData(d));
// insertData(data);
function fetchData() {
    const query = document.querySelector("#city");
    if (query.value) {
        bgImg.style.backgroundImage = `url(${loading}`;
        content.style.display = "none";
        url = `http://api.openweathermap.org/data/2.5/weather?q=${query.value}&APPID=352af670c848dc23fc755682c4022f19`;
        const newData = getData(url);
        console.log(newData);
        newData.then(d => insertData(d));
        query.value = '';
    }
}
function enterKeyPressed(e) {
    if (e.key == "Enter") {
        fetchData();
    }
}
unitToggleC.addEventListener('click', () => tempConvertC(absoluteTemp));
unitToggleF.addEventListener('click', () => tempConvertF(absoluteTemp));
searchBtn.addEventListener('click', fetchData);
document.body.addEventListener('keypress', enterKeyPressed);