const unitToggleF = document.querySelector(".fahrenheit");
const unitToggleC = document.querySelector(".celcius");
const tempConvertC = function (absoluteTemp) {
    const isActive = document.querySelector('.celcius.active');
    if (isActive) return;
    unitToggleC.classList.toggle('active');
    unitToggleF.classList.toggle('active');
    const temp = document.querySelector('.temperature');
    temp.textContent = Math.trunc(absoluteTemp - 273.15);
}
const tempConvertF = function (absoluteTemp) {
    const isActive = document.querySelector('.fahrenheit.active');
    if (isActive) return;
    unitToggleF.classList.toggle('active');
    unitToggleC.classList.toggle('active');
    const temp = document.querySelector('.temperature');
    temp.textContent = Math.trunc((absoluteTemp - 273.15) * (9 / 5) + 32);
}
export { tempConvertC, tempConvertF };