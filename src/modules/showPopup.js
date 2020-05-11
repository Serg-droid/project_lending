import animatePopup from './animatePopup';

function showPopup() {
    const popup = document.querySelector('.popup'),
        btnPopupList = document.querySelectorAll('.popup-btn'),
        btnPopupClose = document.querySelector('.popup-close'),
        popupContent = document.querySelector('.popup-content');

    const popupHandler = (e) => {
        if (e.target.classList.value === 'popup') {
            popup.style.display = 'none';
            popup.removeEventListener('click', popupHandler);
        }
    };

    btnPopupList.forEach((elem) => {
        elem.addEventListener('click', () => {
            popup.style.display = 'block';
            popup.addEventListener('click', popupHandler);
            if (screen.width >= 786) {
                requestAnimationFrame(() => animatePopup(0.5));
            }
            if(screen.width < 700){
                popupContent.style.cssText = 'left: 13%';
            }else if(screen.width < 1050){
                popupContent.style.cssText = 'left: 30%';
            }
        });
    });

    btnPopupClose.addEventListener('click', () => {
        popup.style.display = 'none';
    });
}

export default showPopup;