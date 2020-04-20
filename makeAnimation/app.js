const   buttonStart = document.querySelector('.click-to-see'),
        btnAnimated = document.querySelector('.animated'),
        btnReset = document.querySelector('.reset');

let     animationID,
        width = 20,
        stopCancel = -1;

function showAnimation() {
    animationID = requestAnimationFrame(showAnimation);
    if (stopCancel < 0) {
        btnAnimated.style['background-color'] = 'green';
        return;
    }
    if (width > 250) {
        cancelAnimationFrame(animationID);
        return;
    }
    width += 3;
    btnAnimated.style.width = `${width}px`;
    btnAnimated.style['background-color'] = 'red';
}

buttonStart.addEventListener('click', showAnimation);

buttonStart.addEventListener('click', () => stopCancel *= -1);

btnReset.addEventListener('click', () => {
    btnAnimated.style.width = '15px';
    btnAnimated.style['background-color'] = 'white';
});
