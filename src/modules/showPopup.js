import animatePopup from './animatePopup';

function showPopup() {
    const   popup = document.querySelector('.popup'),
            btnPopupList = document.querySelectorAll('.popup-btn'),
            btnPopupClose = document.querySelector('.popup-close');

    const popupHandler = (e) => {
        if(e.target.classList.value === 'popup') {
            popup.style.display = 'none';
            popup.removeEventListener('click', popupHandler);
        }
    };
    
    btnPopupList.forEach((elem) => {
        elem.addEventListener('click', () => {
            popup.style.display = 'block';
            popup.addEventListener('click', popupHandler);
            if(screen.width >= 786) {
                requestAnimationFrame(() => animatePopup(0.5));
            }
        });
    });

    btnPopupClose.addEventListener('click', () => {
        popup.style.display = 'none';
    });
}

export default showPopup;