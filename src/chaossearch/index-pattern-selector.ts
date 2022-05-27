export const fixIndexPatternSelector = () => {
  const elem = document.querySelector(
    `.euiSelectable[data-test-subj="indexPattern-switcher"`
  )?.parentElement;

  if (!elem) return;
  elem.style.width = '520px';
};
