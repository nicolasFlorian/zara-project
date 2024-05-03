export function showDescription(description){
    description.getAttribute('aria-hidden') === 'true' ? description.setAttribute('aria-hidden', 'false') : description.setAttribute('aria-hidden', 'true');
}

