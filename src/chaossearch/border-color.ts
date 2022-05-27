import { dataTestSubj } from './utils';

const GREEN = 'green';
const YELLOW = 'yellow';
const BLUE = 'blue';
const RED = 'red';
const HEAVY_RED = '#730c05';
const WHITE = 'white';

const getElements = (): HTMLElement[] =>
  Array.from(document.querySelectorAll('table.kbn-table > tbody > tr'));

export const getColorOfLevel = (level?: string) => {
  if (!level) return;
  switch (level.toLowerCase()) {
    case 'info':
      return GREEN;
    case 'warn':
    case 'warning':
      return YELLOW;
    case 'error':
      return RED;
  }
};

export const getColorOfStatusCode = (codeStr?: string) => {
  if (!codeStr) return;
  const code = Number.parseInt(codeStr);
  if (code >= 200 && code < 300) return GREEN;
  if (code >= 300 && code < 400) return BLUE;
  if (code >= 400 && code < 500) return RED;
  if (code > 500) return HEAVY_RED;
};

export const colorBorders = () => {
  getElements().forEach((elem) => {
    const statusCode = elem.querySelector(dataTestSubj('line.meta.http_status_code'))?.innerHTML;
    const level = elem.querySelector(dataTestSubj('line.level'))?.innerHTML;

    const color = getColorOfStatusCode(statusCode) || getColorOfLevel(level);
    if (!color) return;

    elem.style.borderLeft = `15px solid ${color}`;
  });
};
