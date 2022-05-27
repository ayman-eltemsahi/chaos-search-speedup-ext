const OPTIONS_KEY = 'CHAOS_SEARCH_OPTIONS_KEY';

export const guard = (optionId: string, handler: () => unknown) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([OPTIONS_KEY], (result: any) => {
      if (result[OPTIONS_KEY]?.[optionId] === false) return resolve(undefined);

      resolve(handler());
    });
  });
};
