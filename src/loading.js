import loadingScreen from "./images/loading-100.gif";
function toggleLoadingScreen(lastBGImg = null, loading = false) {
    const content = document.querySelector('.content');
    const bgImg = document.querySelector('.bg-img');
    const bgLoading = document.querySelector('.bg-loading');

    if (!loading) {
        content.style.display = "block";
        if (lastBGImg) {
            bgImg.style.backgroundImage = lastBGImg;
        }
        bgLoading.style.display = 'none';
        bgImg.style.display = 'block';
    } else {
        bgLoading.style.backgroundImage = `url(${loadingScreen}`;
        bgLoading.style.display = "block";
        bgImg.style.display = "none";
        content.style.display = "none";
    }

}
export default toggleLoadingScreen;