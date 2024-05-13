export function openModal (openBtn, modal) {
  const modalElement = typeof modal === 'string' ? document.querySelector(modal) : modal;
  const modalClose = modalElement.querySelector('.btn__close');
  const openBtnElement = typeof openBtn === 'string' ? document.querySelector(openBtn) : openBtn;

  openBtnElement.addEventListener('click', () => {
    modalElement.setAttribute('data-open', 'true');
  });

  modalClose.addEventListener('click', () => {
    modalElement.setAttribute('data-open', 'false');
  });
}