export const runPeriodically = (ms: number, inputFun: Function) => {
  const retObj = { id: undefined } as { id?: ReturnType<typeof setTimeout> };
  const fn = () => {
    inputFun();

    retObj.id = setTimeout(fn, ms);
  };

  fn();

  return retObj;
};
