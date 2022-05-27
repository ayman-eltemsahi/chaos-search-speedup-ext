import { CLASS_NAMES } from '../consts';

export const COPY_ICON_STYLES = `
.${CLASS_NAMES.copy_icon} {
  cursor: pointer;
  display: inline-block;
  transition: transform 0.1s ease;
  padding-right: 3px;
  padding-left: 3px;
}

.${CLASS_NAMES.copy_icon}:active {
  transform: scale(0.7);
}
`;

export const addStyles = (styles: string) => {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(styles));
  (document.head || document.getElementsByTagName('head')[0]).append(style);
};
