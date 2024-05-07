import { Utilities } from './utilities.js';

const modeBtn = document.querySelector('.mode__btn');
const textMode = modeBtn.querySelector('.mode__text');
const utilities = new Utilities();

export const changeTheme = () => {
    modeBtn.getAttribute('data-theme') === 'light' ? setDarkTheme() : setLightTheme();

    function setDarkTheme() {
        document.body.setAttribute('data-theme', 'dark');
        modeBtn.setAttribute('data-theme', 'dark');
        utilities.changeIcon('.mode__icon', 'moon')
        textMode.textContent = 'ESCURO';
    }
    function setLightTheme() {
        document.body.setAttribute('data-theme', 'light');
        modeBtn.setAttribute('data-theme', 'light');
        utilities.changeIcon('.mode__icon', 'sun')
        textMode.textContent = 'CLARO';
    }
}
