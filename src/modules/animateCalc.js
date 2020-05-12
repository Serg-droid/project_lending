const animateCalc = (total) => {
    const totalValue = document.getElementById('total');

    let count = 1;
    const idInterval = setInterval(() => {
        const step = total / 37.5;
        totalValue.textContent = count;

        if (count < total) {
            count += step;
            totalValue.textContent = Math.floor(count);
        } else {
            clearInterval(idInterval);
            count = total;
            totalValue.textContent = count;
        }
    });
};

export default animateCalc;