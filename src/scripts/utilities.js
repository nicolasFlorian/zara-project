export class Utilities {
    constructor() {
        this.svgns = "http://www.w3.org/2000/svg";
        this.xlinkns = "http://www.w3.org/1999/xlink";
    }

    changeIcon(selector, newIconId) {
        this.selector = typeof selector === 'string' ? document.querySelector(selector) : selector;
        const icon = this.selector;
        const iconUse = icon.querySelector('use');
        iconUse.remove();
        const newIconRef = `./__spritemap#sprite-${newIconId}`;
        const newIcon = document.createElementNS(this.svgns, 'use');
        newIcon.setAttributeNS(this.xlinkns, 'xlink:href', newIconRef);
        icon.appendChild(newIcon);
        icon.closest('button').setAttribute('aria-label', newIconId);
    }

    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    deepMerge(defaults, options) {
        const result = { ...defaults };
        for (const [key, value] of Object.entries(options)) {
            if (value instanceof Object && key in defaults) {
                result[key] = this.deepMerge(defaults[key], value);
            } else {
                result[key] = value;
            }
        }
        return result;
    }

    createElements(html){
        const template = document.createElement('template');
        template.innerHTML = html;
        return template.content.children;
    }

    showNotification(message, type, where = document.querySelector('body'), duration = 3000) {
        const whereElement = typeof where === 'string' ? document.querySelector(where) : where;
        whereElement.style.position = 'relative';
        const notification = this.createElements(`<div class="notification notification--${type} showUp"></div>`)[0];
        notification.textContent = message;
        whereElement.appendChild(notification);
        setTimeout(() => {
            notification.classList.remove('showUp');
            notification.classList.add('showDown');
            notification.addEventListener('animationend', () => {
                notification.remove();
            });
        }, duration);
    }
}