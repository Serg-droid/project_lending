function validateCalcInputs() {
    const   calcBlock = document.querySelector('.calc-block');

    const inputCalcHandler = (elem) => {
        elem.value = elem.value.replace(/[^\d]/g, '');
    };

    calcBlock.addEventListener('keyup', (e) => {
        const target = e.target;
        if(!target.matches('.calc-square, .calc-count, .calc-day')) {
            return;
        }
        inputCalcHandler(target);
    });
}

export default validateCalcInputs;