import { Utilities } from './utilities.js';
const utilities = new Utilities();

// SLIDER CLASS

export class Scroller {
    init(element, options){
        // PARAMETER ELEMENT AND OPTIONS
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        this.axis = options.axis;
        this.grab = options.grab;
        this.touch = options.touch;
        this.wheel = options.wheel;
        this.type = options.scrollBar?.type;
        this.wrapper

        // SCROLLBAR
        this.hasTouchScrollBar = false;
        this.scrollBarThumb
        this.scrollBarTrack
        this.scrollBarBullet
        
        this.bulletColor = options.scrollBar?.thumb?.bulletColor;
        if(!this.bulletColor){
            this.bulletColor = '#bfbfbf';
        }

        this.bulletColorHover = options.scrollBar?.thumb?.bulletColorHover;
        if(!this.bulletColorHover){
            this.bulletColorHover = '#999999';
        }

        this.initialSize = options.scrollBar?.initialSize;
        if(!this.initialSize && this.initialSize !== 0 || this.initialSize < 0){
            this.initialSize = 1;
        }

        this.scrollBarHeight = options?.height;
        if(!this.scrollBarHeight){
            this.scrollBarHeight = '12px';
        }

        this.scrollBarWidth = options?.width;
        if(!this.scrollBarWidth){
            this.scrollBarWidth = '12px';
        }

        this.scrollBarWidthDefault = options?.widthDefault;
        if(!this.scrollBarWidthDefault){
            this.scrollBarWidthDefault = '100%';
        }

        this.scrollBarHeightDefault = options?.heightDefault;
        if(!this.scrollBarHeightDefault){
            this.scrollBarHeightDefault = '100%';
        }

        this.align = options?.align;
        if(!this.align){
            this.align = 'center';
        }
        this.boundMouseMoveScrollBar = this.#mouseMoveScrollBar.bind(this);

        const defaultScrollBar = {
            height: this.axis === 'x' ? this.scrollBarHeight : this.scrollBarHeightDefault,
            width: this.axis === 'x' ? this.scrollBarWidthDefault : this.scrollBarWidth,
            align: this.align,
            gap: '10px',
            track: {
                padding: '2px',
                background: 'transparent',
                borderBlock: this.axis === 'x' ? '0.5px solid #cccccc' : 'none',
                borderInline: this.axis === 'y' ? '0.5px solid #cccccc' : 'none',
                radius: '0px',
            },
            thumb: {
                background: '#bfbfbf',
                backgroundHover: '#999999',
                radius: '15px',
            }
        };
        if (this.type === 'progress'){
            if(this.axis === 'x'){
                defaultScrollBar.height = '5px';
            }else{
                defaultScrollBar.width = '5px';
            }
            defaultScrollBar.track.padding = '0px';
            defaultScrollBar.track.border = 'none';
            defaultScrollBar.track.radius = '5px';
            defaultScrollBar.track.background = '#cccccc';
            defaultScrollBar.thumb.background = defaultScrollBar.thumb.backgroundHover;
        }
        if (this.type === 'bullet'){
            if(this.axis === 'x'){
                defaultScrollBar.height = '3px';
            }else{
                defaultScrollBar.width = '3px';
            }
            defaultScrollBar.track.padding = '0px';
            defaultScrollBar.track.border = 'none';
            defaultScrollBar.track.radius = '5px';
            defaultScrollBar.track.background = '#cccccc';
            defaultScrollBar.thumb.bulletSize = '12px';
            defaultScrollBar.thumb.bulletColor = this.bulletColor;
            defaultScrollBar.thumb.bulletColorHover = this.bulletColorHover;
        }
        if(options.scrollBar){
            this.scrollBar = utilities.deepMerge(defaultScrollBar, options.scrollBar);
        }

        // SLIDER PROPERTIES
        this.hasTouch = false;
        this.startX = 0;
        this.startY = 0;
        this.userVelocity = 0;
        this.requestId = null;
        this.deltaSpeedScroll = 0.5;
        this.deltaSpeedInertia = 0.95;
        this.inertiaSmooth = 0.04;

        // INITIALIZING THE SLIDER
        if(this.scrollBar?.enabled){
            this.#wrapElementWithScrollBar(this.scrollBar);
        }
        if(this.grab){
            this.#grabSlider();
        }
        if(this.touch){
            this.#touchSlider();
        }
        if(this.wheel){
            this.#wheelSlider();
        }

        // SCROLLBAR EVENTS
        if(this.scrollBar?.type === 'default' || !this.scrollBar?.type && this.scrollBar?.enabled){
            this.#scrollBarDefault();
        }
        if(this.scrollBar?.type === 'progress'){
            this.#scrollBarProgress();
        }
        if(this.scrollBar?.type === 'bullet'){
            this.#scrollBarBullet();
        }
    }

    #wrapElementWithScrollBar(options){
        const style = document.createElement('style');
        style.textContent = `
            .scrollbar__thumb:hover, .scrollbar__thumb:hover .bullet {
                background: ${options.thumb.backgroundHover} !important;
            }
            .scrollbar__thumb .bullet:hover{
                background: ${options.thumb.bulletColorHover} !important;
            }
        `;
        document.head.appendChild(style);
        
        const wrapper = document.createElement('div');
        wrapper.classList.add('scrollbar-wrapper');

        // Adding styles to the wrapper
        wrapper.style.display = 'grid';
        if (this.axis === 'x') {
            wrapper.style.gridTemplateRows = '1fr auto';
        }else{
            wrapper.style.gridTemplateColumns = '1fr auto';
        }
        wrapper.style.gap = options.gap;

        // Move the element into the wrapper
        wrapper.appendChild(this.element.cloneNode(true));

        // Replace the element with the wrapper in the DOM
        this.element.parentNode.replaceChild(wrapper, this.element);

        // Create the scrollbar element
        const scrollBarThumb = document.createElement('div');
        scrollBarThumb.classList.add('scrollbar__thumb');
        this.scrollBarThumb = scrollBarThumb;
        const scrollBarTrack = document.createElement('div');
        scrollBarTrack.classList.add('scrollbar__track');
        this.scrollBarTrack = scrollBarTrack;
        if (options.type === 'bullet') {
            const bullet = document.createElement('div');
            bullet.classList.add('bullet');
            this.scrollBarBullet = bullet;
            let bulletSize = options.thumb.bulletSize.replace(/[^0-9]/g, '');
            bullet.style.position = 'absolute';
            bullet.style.top = this.axis === 'x' ? `calc(50% - ${bulletSize / 2}px)` : `calc(100% - ${bulletSize / 2}px)`;
            bullet.style.left = this.axis === 'x' ? `calc(100% - ${bulletSize / 2}px)` : `calc(50% - ${bulletSize / 2}px`; 

            bullet.style.zIndex = '1';
            bullet.style.width = `${bulletSize}px`;
            bullet.style.height = `${bulletSize}px`;
            bullet.style.backgroundColor = options.thumb.bulletColor;
            bullet.style.borderRadius = '50%';
            bullet.style.cursor = 'pointer';
            scrollBarThumb.appendChild(bullet);
        }        
        
        // Append the thumb to the track, not the other way around
        scrollBarTrack.appendChild(scrollBarThumb);
        
        // Adding styles to the scrollbar
        scrollBarTrack.style.setProperty('justify-self', options.align);
        scrollBarTrack.style.setProperty('width', options.width);
        scrollBarTrack.style.setProperty('height', options.height);
        scrollBarTrack.style.setProperty('background-color', options.track.background);
        scrollBarTrack.style.setProperty('border-radius', options.track.radius);
        scrollBarTrack.style.setProperty('padding', options.track.padding);
        scrollBarTrack.style.setProperty('border-block', options.track.borderBlock);
        scrollBarTrack.style.setProperty('border-inline', options.track.borderInline);
        scrollBarTrack.style.setProperty('border', options.track.border);
        
        if(this.axis === 'x'){
            scrollBarThumb.style.setProperty('height', '100%');
        }else{
            scrollBarThumb.style.setProperty('width', '100%');
        }
        scrollBarThumb.style.setProperty('background-color', options.thumb.background);
        scrollBarThumb.style.setProperty('border-radius', options.thumb.radius);
        scrollBarThumb.style.setProperty('position', 'relative');

        // Append the scrollbar elements to the wrapper
        wrapper.appendChild(scrollBarTrack);

        // Update this.element to refer to the wrapper
        this.element = wrapper.firstChild;
        this.wrapper = wrapper;
    }

    // GRAB SLIDER

    #grabSlider(){
        this.element.addEventListener('mousedown', (e) => this.#mouseStart(e));
        this.element.addEventListener('mouseup', () => this.#mouseEnd());
        this.element.addEventListener('mousemove', (e) => this.#mouseMove(e));
        this.element.addEventListener('mouseleave', () => this.#mouseEnd());
    }

    #mouseStart(e){
        e.preventDefault();
        this.hasTouch = true;
        if(this.axis === 'x'){
            this.startX = e.clientX;
        }else{
            this.startY = e.clientY;
        }
        this.#stopInertiaAnimation();
    }

    #mouseMove(e){
        e.preventDefault();
        if (!this.hasTouch) return;
        if(this.axis === 'x'){
            const currentX = e.clientX;
            let distanceX = Math.round((this.startX - currentX) * this.deltaSpeedScroll);
            this.element.scrollLeft += distanceX;
            this.startX = currentX;
            this.userVelocity = utilities.clamp(distanceX, -20, 20);
        }else{
            const currentY = e.clientY;
            let distanceY = Math.round((this.startY - currentY) * this.deltaSpeedScroll);
            this.element.scrollTop += distanceY;
            this.startY = currentY;
            this.userVelocity = utilities.clamp(distanceY, -20, 20);
        }
    }

    #mouseEnd(){
        this.hasTouch = false;
        this.#startInertiaAnimation();
    }

    // TOUCH SLIDER

    #touchSlider(){
        this.element.addEventListener('touchstart', (e) => this.#touchStart(e));
        this.element.addEventListener('touchend', () => this.#touchEnd());
        this.element.addEventListener('touchmove', (e) => this.#touchMove(e));
    }

    #touchStart(e){
        this.hasTouch = true;
        if(this.axis === 'x'){
            this.startX = e.touches[0].clientX;
        }else{
            this.startY = e.touches[0].clientY;
        }
        this.#stopInertiaAnimation();
    }

    #touchEnd(){
        this.hasTouch = false;
        this.#startInertiaAnimation();
    }

    #touchMove(e){
        if(!this.hasTouch) return;
        const currentX = e.touches[0].clientX; 
        let distanceX = Math.round((this.startX - currentX) * this.deltaSpeedScroll);
        const currentY = e.touches[0].clientY;
        let distanceY = Math.round((this.startY - currentY) * this.deltaSpeedScroll);
    
        if(this.axis === 'x'){
            e.preventDefault();
            this.element.scrollLeft += distanceX;
        }else{
            e.preventDefault();
            this.element.scrollTop += distanceY;
        }
        this.startX = currentX;
        this.startY = currentY;
        this.userVelocity = utilities.clamp(distanceX, -20, 20);
    }

    // WHEEL SLIDER

    #wheelSlider(){
        this.element.addEventListener('wheel', (e) => this.#handleWheel(e));
    }

    #handleWheel(e){
        if (this.axis === 'x'){
            if(Math.abs(e.deltaY) > Math.abs(e.deltaX) || e.shiftKey){
                return;
            }else{
                e.preventDefault();
                const deltaX = utilities.clamp(e.deltaX, -20, 20);
                this.element.scrollLeft += deltaX;
            }
        }else{
            e.preventDefault();
            const deltaY = utilities.clamp(e.deltaY, -20, 20);
            this.element.scrollTop += deltaY;
        }
    }

    // SCROLLBAR

    #scrollBarDefault(){
        let scrollSize = this.axis === 'x' ? this.element.scrollWidth : this.element.scrollHeight;
        let clientSize = this.axis === 'x' ? this.element.clientWidth : this.element.clientHeight;
        let thumbSize = (clientSize / scrollSize) * 100;
        this.scrollBarThumb.style.setProperty('width', `${thumbSize}%`);

        this.element.addEventListener('scroll', () => {
            let scrollSize = this.axis === 'x' ? this.element.scrollWidth : this.element.scrollHeight;
            let scrollPosition = this.axis === 'x' ? this.element.scrollLeft : this.element.scrollTop;
            let thumbPosition = (scrollPosition / scrollSize) * 100;
            this.scrollBarThumb.style.setProperty(this.axis === 'x' ? 'left' : 'top', `${thumbPosition}%`);
        });

        this.scrollBarThumb.addEventListener('mousedown', (e) => {
            this.#mouseStartScrollBar(e);
            document.addEventListener('mousemove', this.boundMouseMoveScrollBar);
        });
        
        document.addEventListener('mouseup', () => {
            this.#mouseEndScrollBar();
            document.removeEventListener('mousemove', this.boundMouseMoveScrollBar);
        });
    }

    #scrollBarProgress(){
        this.#initializeScrollBar()

        this.element.addEventListener('scroll', () => {
            this.#updateThumbSize();
        });
    }

    #scrollBarBullet(){
        this.#initializeScrollBar()

        this.element.addEventListener('scroll', () => {
            this.#updateThumbSize();
        });

        this.scrollBarBullet.addEventListener('mousedown', (e) => {
            this.scrollBarBullet.style.setProperty('background', this.scrollBar.thumb.bulletColorHover);
            this.#mouseStartScrollBar(e);
            document.addEventListener('mousemove', this.boundMouseMoveScrollBar);
        });
        
        document.addEventListener('mouseup', () => {
            this.scrollBarBullet.style.setProperty('background', this.scrollBar.thumb.bulletColor);
            this.#mouseEndScrollBar();
            document.removeEventListener('mousemove', this.boundMouseMoveScrollBar);
        });
    }

        //SCROLLBAR EVENTS

        #initializeScrollBar() {
            this.scrollBarThumb.style[this.axis === 'x' ? 'width' : 'height'] = `${this.initialSize}%`; // Initial minimum width
        }

        #mouseStartScrollBar(e){
            this.scrollBarThumb.style.setProperty('background', this.scrollBar.thumb.backgroundHover);
            this.hasTouchScrollBar = true;
            if(this.axis === 'x'){
                this.startX = e.clientX;
            }else{
                this.startY = e.clientY;
            }
        }

        #mouseMoveScrollBar(e){
            e.preventDefault();

            // Determine the movement direction and compute delta
            let delta = this.axis === 'x' ? e.clientX - this.startX : e.clientY - this.startY;
            
            if(this.type === 'bullet'){
                let currentSize = parseFloat(this.axis === 'x' ? this.scrollBarThumb.style.width : this.scrollBarThumb.style.height);
                let newSize = currentSize + (delta / (this.axis === 'x' ? this.element.clientWidth : this.element.clientHeight)) * 100;
                newSize = utilities.clamp(newSize, this.initialSize, 100);
                this.scrollBarThumb.style[this.axis === 'x' ? 'width' : 'height'] = `${newSize}%`;

                let newScrollPosition = ((newSize - this.initialSize) / (100 - this.initialSize) * (this.axis === 'x' ? (this.element.scrollWidth - this.element.clientWidth) : (this.element.scrollHeight - this.element.clientHeight)));
                this.element[this.axis === 'x' ? 'scrollLeft' : 'scrollTop'] = newScrollPosition;

                if (this.axis === 'x') {
                    this.startX = e.clientX;
                } else {
                    this.startY = e.clientY;
                }
                return;
            }
        
            // Calculate the current thumb position
            let thumbPosition = parseFloat(this.scrollBarThumb.style.getPropertyValue(this.axis === 'x' ? 'left' : 'top') || 0);
        
            // Calculate the ratio of scrollable area to thumb track length
            let clientSize = this.axis === 'x' ? this.element.clientWidth : this.element.clientHeight;
            let scrollSize = this.axis === 'x' ? this.element.scrollWidth : this.element.scrollHeight;
            let thumbTrackLength = (clientSize / scrollSize) * 100; // this converts the scroll ratio to a percentage
            let newThumbPosition = thumbPosition + (delta / clientSize) * thumbTrackLength;
        
            // Prevent the scrollbar thumb from moving outside its container
            newThumbPosition = utilities.clamp(newThumbPosition, 0, 100 - thumbTrackLength);
        
            // Set the new thumb position
            this.scrollBarThumb.style.setProperty(this.axis === 'x' ? 'left' : 'top', `${newThumbPosition}%`);
        
            // Adjust the content's scroll position
            let newScrollPosition = (newThumbPosition / 100) * scrollSize;
            this.element[this.axis === 'x' ? 'scrollLeft' : 'scrollTop'] = newScrollPosition;
        
            // Update the start X/Y position for the next move event
            if (this.axis === 'x') {
                this.startX = e.clientX;
            } else {
                this.startY = e.clientY;
            }
        }

        #mouseEndScrollBar(){
            this.scrollBarThumb.style.setProperty('background', this.scrollBar.thumb.background);
            this.hasTouchScrollBar = false;
        }

        #updateThumbSize(){            
            let scrollPercentage = this.element[this.axis === 'x' ? 'scrollLeft' : 'scrollTop'] / (this.element[this.axis === 'x' ? 'scrollWidth' : 'scrollHeight'] - this.element[this.axis === 'x' ? 'clientWidth' : 'clientHeight']);
            let newThumbSize = (scrollPercentage * (100 - this.initialSize)) + this.initialSize; 
            newThumbSize = utilities.clamp(newThumbSize, this.initialSize, 100);
  
            this.scrollBarThumb.style.width = `${newThumbSize}%`;
        }

    // INERTIA ANIMATION
    #startInertiaAnimation(){
        cancelAnimationFrame(this.requestId);
        this.requestId = requestAnimationFrame(() => this.#inertiaLoopAnimation());
    }

    #stopInertiaAnimation(){
        cancelAnimationFrame(this.requestId);
    }

    #inertiaLoopAnimation(){
        if(this.axis === 'x'){
            if (Math.abs(this.userVelocity) > this.inertiaSmooth) {
                this.element.scrollLeft += this.userVelocity;
                this.requestId = requestAnimationFrame(() => this.#inertiaLoopAnimation());
            }
        }else{
            if (Math.abs(this.userVelocity) > this.inertiaSmooth) {
                this.element.scrollTop += this.userVelocity;
                this.requestId = requestAnimationFrame(() => this.#inertiaLoopAnimation());
            }
        }
        this.userVelocity *= this.deltaSpeedInertia;
    }
}