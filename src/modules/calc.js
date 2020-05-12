import animateCalc from "./animateCalc";

function calc(price = 100){
    const   calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count');

    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1,
            typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        if(calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if(calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        }else if(calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }

        if(typeValue && squareValue) {
            total = price * typeValue * squareValue * countValue * dayValue;
            total = Math.round(total);
        }

        animateCalc(total);
    };

    calcBlock.addEventListener('change', (e) => {
        const target = e.target;
        if(target.matches('input')) {
            countSum();
        }else if((calcSquare.value || calcDay.value || calcCount.value) && target.matches('select')){
            countSum();
        }
    });
}

export default calc;