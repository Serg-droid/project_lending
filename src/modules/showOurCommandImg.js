function showOurCommandImg() {
    const   command = document.getElementById('command');

    command.addEventListener('click', (e) => {
        const target = e.target;
        if(target.tagName !== "IMG") {
            return;
        }
        const previousPhotoSrc = target.getAttribute('src');
        target.setAttribute('src', target.dataset.img);

        target.addEventListener('mouseout', () => {
            target.setAttribute('src', previousPhotoSrc);
        });
    });
}

export default showOurCommandImg;