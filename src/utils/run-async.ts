export const runAsync = (fn: () => unknown) =>
  new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(fn());
      }, 0);
    } catch (e) {
      reject(e);
    }
  });
