const DEFAULT_TIMEOUT = 10000;

type CancellationToken = {
  isCancelled: boolean;
};

export const waitForElement = (
  selector: string,
  { token, timeoutMs }: { token?: CancellationToken; timeoutMs?: number } = {}
): Promise<HTMLElement | undefined> => {
  const timeout = timeoutMs || DEFAULT_TIMEOUT;
  const start = +new Date();
  return new Promise((resolve, reject) => {
    const checker = () => {
      if (token?.isCancelled) return resolve(undefined);

      const elem = document.querySelector(selector) as HTMLElement;
      if (elem) {
        return resolve(elem);
      }

      if (+new Date() - start >= timeout) {
        return reject(`Timeout, selector: ${selector}`);
      }

      setTimeout(checker, 100);
    };

    checker();
  });
};
