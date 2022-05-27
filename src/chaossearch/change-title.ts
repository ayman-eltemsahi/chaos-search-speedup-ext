export const changeTitle = () => {
  const elem = document.querySelector(
    '.dscIndexPattern__container .euiButtonEmpty__text'
  ) as HTMLElement;
  if (!elem) return;

  const value = (elem.innerHTML || '').replace(/^systemid-logs_/, '').replace(/_90-days$/, '');
  if (!value) return;

  document.title = value;
};
