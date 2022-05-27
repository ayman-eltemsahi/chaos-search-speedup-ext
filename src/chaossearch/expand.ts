import { runAsync } from '../utils/run-async';

const getExpandButtons = (): HTMLElement[] =>
  Array.from(document.querySelectorAll('.euiButtonIcon.euiButtonIcon--text'));

export const forceExpandAll = () => {
  console.log('🔽 forceExpandAll');

  getExpandButtons()
    .filter((elem) => elem.getAttribute('aria-expanded') === 'false')
    .forEach((elem) => runAsync(() => elem.click?.()));
};

export const forceCollapseAll = () => {
  console.log('▶️ forceCollapseAll');

  getExpandButtons()
    .filter((elem) => elem.getAttribute('aria-expanded') === 'true')
    .forEach((elem) => runAsync(() => elem.click?.()));
};

export const expand = () => {
  getExpandButtons()
    .filter((elem) => elem.getAttribute('aria-custom-expanded') !== 'true')
    .forEach((elem) => {
      runAsync(() => {
        elem.click?.();
        elem.setAttribute('aria-custom-expanded', 'true');
      });
    });
};
