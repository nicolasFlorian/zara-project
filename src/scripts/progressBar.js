// import { Sliders } from './sliders.js';
// const ProductSlider = new Sliders();


// export class ProgressBar {
//     constructor(carrouselElement) {
//         this.carrouselContainer = document.querySelector(carrouselElement);
//         this.carrousel = this.carrouselContainer.querySelectorAll(`[data-scroll="true"]`);
//         this.progress = this.carrouselContainer.querySelectorAll('.progress');

//         this.carrousel.forEach((element) => {
//             this.percentageUpdate(element);
//             element.addEventListener('scroll', () => this.percentageUpdate(element));
//         })
//     }

//     percentageUpdate(element) {
//         let percentage = (element.scrollLeft + element.offsetWidth) * 100 / element.scrollWidth;
//         let index = Array.from(this.carrousel).indexOf(element);
//         const progress = this.progress[index];
//         progress.style.width = `${percentage}%`;

//         if (element.scrollLeft >= element.scrollWidth - element.offsetWidth) {
//             this.scrollLimit(progress);
//         }
//     }

//     scrollLimit(progress) {
//         progress.classList.add('scaleBar');
//         progress.addEventListener('animationend', () => {
//             progress.classList.remove('scaleBar');
//         })
//     }
// }