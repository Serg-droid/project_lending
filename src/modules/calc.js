function calc(price = 100){
    const   calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1,
            typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value,
            timeoutCounter = 25;

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

        const timeoutID = setInterval(function() {
            if(timeoutCounter === 0) {
                totalValue.textContent = total;
                clearInterval(timeoutID);
            }else{
                totalValue.textContent = Math.floor(Math.random() * total);
                timeoutCounter -= 1;
            }
        }, 30);
    };

    calcBlock.addEventListener('change', (e) => {
        const target = e.target;
        if(target.matches('select') || target.matches('input')) {
            countSum();
        }
    });
}

export default calc;