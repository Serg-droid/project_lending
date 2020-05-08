const animateCalc = (total) => {
    let valueToBeEqual = 25;
    const totalValue = document.getElementById('total');

    const intervalID = setInterval(() => {
        if(valueToBeEqual === total){
            totalValue.textContent = total;
            clearInterval(intervalID);
        }

        totalValue.textContent = valueToBeEqual;
        valueToBeEqual += 1;

    }, 0);
};

export default animateCalc;