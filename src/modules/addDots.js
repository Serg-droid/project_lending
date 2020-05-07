function addDots() {
    const   portfolioItems = document.querySelectorAll('.portfolio-item'),
            dotList = document.querySelector('.portfolio-dots'),
            portfolioLength = portfolioItems.length,
            fragment = document.createDocumentFragment();
    
    for(let i = 0; i < portfolioLength; i++) {
        const li = document.createElement('li');
        li.classList.add('dot');
        if(i === 0) {
            li.classList.add('dot-active');
        }
        fragment.append(li);
    }  
    
    dotList.append(fragment);
}

export default addDots;