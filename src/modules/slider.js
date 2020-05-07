function slider() {
    const   portfolio = document.querySelector('.portfolio'),
            allDots = portfolio.querySelectorAll('.dot'),
            portfolioItems = portfolio.querySelectorAll('.portfolio-item'),
            [...arrOfDots] = allDots;

    let currentIndex = 0,
        autoChangingID;

    function changeImages(index) {  
        portfolioItems.forEach((elem) => {
            elem.classList.remove('portfolio-item-active');
        });
        allDots.forEach((elem) => {
            elem.classList.remove('dot-active');
        });

        allDots[index].classList.add('dot-active');
        portfolioItems[index].classList.add('portfolio-item-active');
    }

    function changeHandler(target) {
        if(target.matches('.dot')) {
            currentIndex = arrOfDots.indexOf(target);
            changeImages(currentIndex);
        }else if(target.matches('#arrow-left')) {
            // Проверка на выход за границы массива точек
            currentIndex = currentIndex - 1 < 0 ? arrOfDots.length - 1 : currentIndex - 1;
            changeImages(currentIndex);
        }else if(target.matches('#arrow-right')) {
            // -\\-
            currentIndex = currentIndex + 1 === arrOfDots.length ? 0 : currentIndex + 1;
            changeImages(currentIndex);
        }
    }

    const autoChanging = () => {
        currentIndex = currentIndex + 1 === arrOfDots.length ? 0 : currentIndex + 1;
        changeImages(currentIndex);
    };

    const autoChangingStart = (time = 3000) => {
        autoChangingID = setInterval(autoChanging, time);
    };

    const autoChangingStop = () => {
        clearInterval(autoChangingID);
    }
    
    portfolio.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;
        if(!e.target.matches('.portfolio-btn, .dot')) {
            return;
        }
        changeHandler(target);
    });

    portfolio.addEventListener('mouseover', (e) => {
        if(e.target.matches('.portfolio-btn')) {
            autoChangingStop();
        }
    });

    portfolio.addEventListener('mouseout', (e) => {
        if(e.target.matches('.portfolio-btn')) {
            autoChangingStart(2000);
        }
    });

    autoChangingStart(2000);
}

export default slider;