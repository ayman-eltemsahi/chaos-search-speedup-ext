export const throttle = (ms: number, fn: Function) => {
  let timeout: NodeJS.Timeout;
  const trigger = (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), ms);
  };

  const cancel = () => {
    clearTimeout(timeout);
  };

  return { trigger, cancel };
};
