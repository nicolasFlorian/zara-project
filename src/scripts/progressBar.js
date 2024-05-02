function handleWheel(carrousel, carrouselWidth, carrouselScrollWidth, progress) {
    return function(event) {
        event.preventDefault();
        let delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
        let scrollSpeed = Math.abs(delta) > 60 ? 0.5 : 1.5;
        carrousel.scrollLeft += delta * scrollSpeed;
        let percentage = (carrousel.scrollLeft + carrouselWidth) * 100 / carrouselScrollWidth;
        progress.style.width = `${percentage}%`;
        if(percentage >= 100 && delta > 20) {
            progress.classList.add('scaleBar');
            progress.addEventListener('animationend', () => {
                progress.classList.remove('scaleBar');
            })
        }
    }
}

export function progressBar() {
    const carrousel = document.querySelector('.products__container');
    const carrouselWidth = carrousel.offsetWidth;
    const carrouselScrollWidth = carrousel.scrollWidth;
    const scrollBar = document.querySelector('.carrousel__products__container__scroll-bar');
    const progress = scrollBar.querySelector('.progress');

    let percentage = (carrouselWidth * 100) / carrouselScrollWidth;
    progress.style.width = `${percentage}%`;

    const wheelHandler = handleWheel(carrousel, carrouselWidth, carrouselScrollWidth, progress);
    carrousel.removeEventListener('wheel', wheelHandler);
    carrousel.addEventListener('wheel', wheelHandler);
}

window.addEventListener('resize', () => {
    progressBar();
})