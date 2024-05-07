export class Utilities {
    constructor() {
        this.svgns = "http://www.w3.org/2000/svg";
        this.xlinkns = "http://www.w3.org/1999/xlink";
    }

    changeIcon(selector, newIconId) {
        const icon = document.querySelector(`${selector}`);
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
}