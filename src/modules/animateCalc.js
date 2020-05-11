const animateCalc = (total) => {
    let valueToBeEqual = 0;
    let speed = 3;
    const totalValue = document.getElementById('total');

    if(total > 5000){
        speed = 7;
    }else if(total > 2000){
        speed = 6;
    }else if(total > 1000){
        speed = 5;
    }else{
        speed = 2;
    }

    const intervalID = setInterval(() => {
        if(valueToBeEqual === total){
            totalValue.textContent = total;
            clearInterval(intervalID);
        }
        if(valueToBeEqual + speed < total){
            totalValue.textContent = valueToBeEqual;
            valueToBeEqual += speed;
        }else{
            valueToBeEqual = total;
        }

    }, 1);
};

export default animateCalc;