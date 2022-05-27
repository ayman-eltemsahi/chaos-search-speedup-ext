export const dataTestSubj = (v: string) =>
  `.kbnDocViewer__value[data-test-subj="tableDocViewRow-${v}-value"]`;

export const dataTestSubjList = (items: string[]) => items.map(dataTestSubj).join(',');

export const trDataTestSubjList = (items: string[]) =>
  items.map((item) => `tr[data-test-subj="tableDocViewRow-${item}"]`).join(',');
