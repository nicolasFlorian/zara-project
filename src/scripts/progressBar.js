export class Slider {
    constructor(carrouselSelector, progressSelector) {
        this.carrousel = document.querySelector(carrouselSelector);
        this.progress = document.querySelector(progressSelector);
        this.hasTouch = false;
        this.startX = 0;
        this.velocity = 0;
        this.requestId = 0;
        this.speed = 0.97;

        this.carrousel.addEventListener('touchstart', this.touchStart.bind(this));
        this.carrousel.addEventListener('touchend', this.touchEnd.bind(this));
        this.carrousel.addEventListener('touchmove', this.touchMove.bind(this));
        this.carrousel.addEventListener('wheel', this.handleWheel.bind(this));

        this.percentageUpdate();
    }

    handleWheel(e) {
        e.preventDefault();
        let delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        let scrollSpeed = Math.abs(delta) > 60 ? 0.2 : 0.4;
        this.carrousel.scrollLeft += delta * scrollSpeed;
        this.percentageUpdate();
        this.scrollLimit(delta);
    }

    touchStart(e) {
        this.hasTouch = true;
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        this.stopInertiaTracking();
    }

    touchEnd() {
        this.hasTouch = false;
        this.startInertiaTracking();
    }

    touchMove(e) {
        if(!this.hasTouch) return;
        const currentX = e.touches[0].clientX; 
        let distanceX = Math.round((this.startX - currentX) / 2);
        const currentY = e.touches[0].clientY;
        let distanceY = Math.round((this.startY - currentY) / 2);
    
        if(Math.abs(distanceX) > Math.abs(distanceY)) {
            e.preventDefault();
            this.carrousel.scrollLeft += distanceX;
        }
        this.startX = currentX;
        this.velocity = this.clamp(distanceX, -20, 20);
        this.percentageUpdate();
        this.scrollLimit(distanceX, 5);
    }
    

    startInertiaTracking() {
        this.stopInertiaTracking();
        this.requestId = requestAnimationFrame(this.inertiaLoop.bind(this));
    }

    stopInertiaTracking() {
        cancelAnimationFrame(this.requestId);
    }

    inertiaLoop() {
        if(Math.abs(this.velocity) > 0.1) {
            this.carrousel.scrollLeft += this.velocity;
            this.percentageUpdate();
            this.requestId = requestAnimationFrame(this.inertiaLoop.bind(this));
        }
        this.velocity *= this.speed;
    }

    percentageUpdate() {
        let percentage = (this.carrousel.scrollLeft + this.carrousel.offsetWidth) * 100 / this.carrousel.scrollWidth;
        this.progress.style.width = `${percentage}%`;
    }

    scrollLimit(delta, amount = 20) {
        let percentage = (this.carrousel.scrollLeft + this.carrousel.offsetWidth) * 100 / this.carrousel.scrollWidth;
        percentage = this.clamp(percentage, 0, 100);
        percentage = Math.round(percentage);
        if(percentage >= 100 && delta > amount) {
            this.progress.classList.add('scaleBar');
            this.progress.addEventListener('animationend', () => {
                this.progress.classList.remove('scaleBar');
            })
        }
    }

    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
}