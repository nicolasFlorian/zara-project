import { Utilities } from './utilities.js';
const utilities = new Utilities();

export class Sliders  {
    constructor(){
        this.hasTouch = false;
        this.startX = 0;
        this.startY = 0;
        this.velocity = 0;
        this.requestId = null;
        this.speed = 0.95;
    }

    // Grab Slider

    grab(element, axis){
        const sliderArea = typeof element === 'string' ? document.querySelector(element) : element;

        sliderArea.addEventListener('mousedown', (e) => this.#mouseStart(e, axis));
        sliderArea.addEventListener('mouseup', () => this.#mouseEnd(sliderArea, axis));
        sliderArea.addEventListener('mousemove', (e) => this.#mouseMove(e, sliderArea, axis));
        sliderArea.addEventListener('mouseleave', () => this.#mouseEnd(sliderArea, axis));
    }

    #mouseStart(e, axis){
        e.preventDefault();
        this.hasTouch = true;
        if(axis === 'x'){
            this.startX = e.clientX;
        }else{
            this.startY = e.clientY;
        }
        this.#stopInertiaTracking();
    }

    #mouseMove(e, element, axis){
        e.preventDefault();
        if (!this.hasTouch) return;
        if(axis === 'x'){
            const currentX = e.clientX;
            let distanceX = Math.round((this.startX - currentX) / 2);
            element.scrollLeft += distanceX;
            this.startX = currentX;
            this.velocity = utilities.clamp(distanceX, -20, 20);
        }else{
            const currentY = e.clientY;
            let distanceY = Math.round((this.startY - currentY) / 2);
            element.scrollTop += distanceY;
            this.startY = currentY;
            this.velocity = utilities.clamp(distanceY, -20, 20);
        }
    }

    #mouseEnd(element, axis){
        this.hasTouch = false;
        this.#startInertiaTracking(element, axis);
    }

    // Touch Slider

    touch(element, axis){
        const sliderArea = typeof element === 'string' ? document.querySelector(element) : element;

        element.addEventListener('touchstart', (e) => this.#touchStart(e, axis));
        element.addEventListener('touchend', () => this.#touchEnd(sliderArea, axis));
        element.addEventListener('touchmove', (e) => this.#touchMove(e, sliderArea, axis));
    }

    #touchStart(e, axis){
        this.hasTouch = true;
        if(axis === 'x'){
            this.startX = e.touches[0].clientX;
        }else{
            this.startY = e.touches[0].clientY;
        }
        this.#stopInertiaTracking();
    }

    #touchEnd(element, axis){
        this.hasTouch = false;
        this.#startInertiaTracking(element, axis);
    }

    #touchMove(e, element, axis){
        if(!this.hasTouch) return;
        const currentX = e.touches[0].clientX; 
        let distanceX = Math.round((this.startX - currentX) / 2);
        const currentY = e.touches[0].clientY;
        let distanceY = Math.round((this.startY - currentY) / 2);
    
        if(axis === 'x'){
            e.preventDefault();
            element.scrollLeft += distanceX;
        }else{
            e.preventDefault();
            element.scrollTop += distanceY;
        }
        this.startX = currentX;
        this.startY = currentY;
        this.velocity = utilities.clamp(distanceX, -20, 20);
    }

    // Wheel Slider

    wheel(element, axis){
        const sliderArea = typeof element === 'string' ? document.querySelector(element) : element;

        sliderArea.addEventListener('wheel', (e) => this.#handleWheel(e, sliderArea, axis));
    }

    #handleWheel(e, element, axis){
        if (axis === 'x'){
            if(Math.abs(e.deltaY) > Math.abs(e.deltaX) || e.shiftKey){
                return;
            }else{
                e.preventDefault();
                const deltaX = utilities.clamp(e.deltaX, -20, 20);
                element.scrollLeft += deltaX;
            }
        }else{
            e.preventDefault();
            const deltaY = utilities.clamp(e.deltaY, -20, 20);
            element.scrollTop += deltaY;
        }
    }

    // Inertia tracking

    #startInertiaTracking(element, axis) {
        cancelAnimationFrame(this.requestId);
        this.requestId = requestAnimationFrame(() => this.#inertiaLoop(element, axis));
    }

    #stopInertiaTracking() {
        cancelAnimationFrame(this.requestId);
    }

    #inertiaLoop(element, axis) {
        if(axis === 'x'){
            if (Math.abs(this.velocity) > 0.05) {
                element.scrollLeft += this.velocity;
                this.requestId = requestAnimationFrame(() => this.#inertiaLoop(element, axis));
            }
        }else if(axis === 'y'){
            if (Math.abs(this.velocity) > 0.05) {
                element.scrollTop += this.velocity;
                this.requestId = requestAnimationFrame(() => this.#inertiaLoop(element, axis));
            }
        }
        this.velocity *= this.speed;
    }
}