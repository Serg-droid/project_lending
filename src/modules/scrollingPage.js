function scrollingPage() {
    const   menuItems = document.querySelectorAll('menu > ul > li > a'),
            serviceBlockHref = document.querySelector('main > a');

    const scrollingHandler = function(e) {
        e.preventDefault();
        const   href = this.href.split('#')[1].split('-')[0],
                itemToGoTo = document.querySelector(`.${href}`);
        itemToGoTo.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    serviceBlockHref.addEventListener('click', scrollingHandler);

    menuItems.forEach((elem) => {
        elem.addEventListener('click', scrollingHandler);
    });
}

export default scrollingPage;