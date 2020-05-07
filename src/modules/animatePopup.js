function animatePopup(scale) {
    const popupContent = document.querySelector('.popup-content');

    const animationID = requestAnimationFrame(() => animatePopup(scale));
    scale += 0.02;
    popupContent.style.transform = `scale(${scale})`;
    if(scale > 1) {
        cancelAnimationFrame(animationID);
    }
}

export default animatePopup;