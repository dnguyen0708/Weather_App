function checkIconExist() {
    const icon = document.querySelector('.left .fa-solid');
    if (icon) {
        const leftPanel = document.querySelector('.left');
        leftPanel.removeChild(icon);
    }
}
export { checkIconExist }