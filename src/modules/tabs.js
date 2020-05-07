function tabs() {
    const   serviceHeader = document.querySelector('.service-header'),
            serviceTabs = document.querySelectorAll('.service-tab'),
            serviceHeaderBtn = document.querySelectorAll('.service-header-tab');

    serviceHeader.addEventListener('click', (e) => {
        let target = e.target.closest('.service-header-tab');
        if(target.classList.contains('active')) {
            return;
        }
        
        const indexServiceTab = Array.from(serviceHeaderBtn).indexOf(target);
        
        serviceHeaderBtn.forEach((elem) => {
            elem.classList.remove('active');
        });
        target.classList.add('active');
        
        serviceTabs[indexServiceTab].classList.remove('d-none');
        serviceTabs.forEach((item, index) => {
            if(index !== indexServiceTab && !item.classList.contains('d-none')) {
                item.classList.add('d-none');
            }
        });
    });
}

export default tabs;