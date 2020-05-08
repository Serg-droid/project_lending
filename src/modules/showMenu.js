function showMenu() {
    const   menu = document.querySelector('menu'),
            body = document.querySelector('body');

    let menuShowed = false;
    menu.style.transition = 'all 0.5s';

    const menuHandler = () => {
        if(!menuShowed) {
            menu.style.transform = 'translateX(100%)';
            menuShowed = !menuShowed;
        }else{
            menu.style.transform = 'translateX(-100%)';
            menuShowed = !menuShowed;
        }
    };
    
    body.addEventListener('click', (e) => {
        const target = e.target.closest('.menu') || e.target.closest('menu');
        if(!target && menuShowed) {
            menuHandler();
            return;
        }else if(!target) {
            return;
        }
        
        if(target.matches('.menu')) {
            menuHandler();
            return;
        }
        if(Array.from(menu.querySelectorAll('a')).includes(e.target)) {
            menuHandler();
        }
    });
}

export default showMenu;