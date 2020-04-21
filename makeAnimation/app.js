const   buttonStart = document.querySelector('.click-to-see'),
        btnAnimated = document.querySelector('.animated'),
        btnReset = document.querySelector('.reset');

let     animationID,
        width = 15,
        animate = true;

function showAnimation() {
    animationID = requestAnimationFrame(showAnimation);
    if (width > 250) {
        cancelAnimationFrame(animationID);
        return;
    }
    width += 3;
    btnAnimated.style.width = `${width}px`;
    btnAnimated.style['background-color'] = 'red';
}

buttonStart.addEventListener('click', function() {
    if (animate) {
        requestAnimationFrame(showAnimation);
        animate = false;
    }else{
        cancelAnimationFrame(animationID);
        animate = true;
    }
});

btnReset.addEventListener('click', () => {
    animate = true;
    width = 15;
    btnAnimated.style.width = '15px';
    btnAnimated.style['background-color'] = 'white';
    cancelAnimationFrame(animationID);
});
