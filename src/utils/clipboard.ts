import { CLASS_NAMES } from '../consts';

export const copyToClipboard = (msg: string) => {
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = msg;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
};

export const createCopyIcon = (text: string): HTMLElement => {
  const copyElem = document.createElement('span');
  copyElem.className = CLASS_NAMES.copy_icon;
  copyElem.textContent = ' 📋';
  copyElem.style.cursor = 'pointer';
  copyElem.style.zIndex = '10000';
  copyElem.onclick = () => {
    setTimeout(() => copyToClipboard(text), 0);
  };
  return copyElem;
};

export const doesNodeHaveCopyIcon = (node: Element | null) =>
  node?.getAttribute('extension__has_copy_icon') === '1';

export const markHasCopyIcon = (node: Element | null) =>
  node?.setAttribute('extension__has_copy_icon', '1');

export const attachCopyIconToNode = (node: HTMLElement, copyIcon: HTMLElement) => {
  if (doesNodeHaveCopyIcon(node)) return;

  markHasCopyIcon(node);
  console.log('📋 inserting copy icon');
  node.parentNode?.insertBefore(copyIcon, node.nextSibling);
};
