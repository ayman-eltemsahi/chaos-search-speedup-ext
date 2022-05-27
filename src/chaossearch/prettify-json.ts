import { runAsync } from '../utils/run-async';
import { convert } from './convert-json';
import { dataTestSubj } from './utils';

export const prettifyJSON = () => {
  const elements = document.querySelectorAll(dataTestSubj('_rawJson'));
  Array.from(elements).forEach((elem) =>
    runAsync(() => {
      if (!elem || elem.getAttribute('aria-custom-prettified') === 'true') return;
      elem.setAttribute('aria-custom-prettified', 'true');

      const valueElement = elem as HTMLElement;
      const content = JSON.parse(valueElement.innerHTML);
      if (!content) return;
      const newText = `<pre class='json-viewer'>${convert(content)}</pre>`;
      valueElement.innerHTML = newText;

      const expandBtnElement = (valueElement?.previousSibling as HTMLElement)?.querySelector(
        '.euiButtonIcon.euiButtonIcon--primary'
      ) as HTMLElement;
      if (expandBtnElement && valueElement?.getAttribute('aria-custom-expanded') !== 'true') {
        valueElement?.setAttribute('aria-custom-expanded', 'true');
        expandBtnElement.click?.();
      }
    })
  );
};
