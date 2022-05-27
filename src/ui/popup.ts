(function () {
  const checkboxIds = [
    'chaos-search-expand-lines',
    'chaos-search-copy-icons',
    'chaos-search-prettify-json',
    'chaos-search-color-borders',
  ];

  type CheckBoxId = typeof checkboxIds[number];

  const OPTIONS_KEY = 'CHAOS_SEARCH_OPTIONS_KEY';

  const sendMessage = (msg: { type: string }, callback = () => {}) =>
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      chrome.tabs.sendMessage(tabs[0].id, msg, callback);
    });

  const addChaosSearchExpandCollapseListeners = () => {
    const expandBtn = document.getElementById('chaos-search-expand-all');
    const collapseBtn = document.getElementById('chaos-search-collapse-all');

    expandBtn?.addEventListener('click', () => sendMessage({ type: 'CHAOS_SEARCH_EXPAND_ALL' }));
    collapseBtn?.addEventListener('click', () =>
      sendMessage({ type: 'CHAOS_SEARCH_COLLAPSE_ALL' })
    );
  };

  const getOptions = () =>
    new Promise((resolve) => {
      chrome.storage.local.get([OPTIONS_KEY], (result) => resolve(result[OPTIONS_KEY]));
    });

  const saveOptions = (content: unknown) =>
    new Promise((resolve) => {
      chrome.storage.local.set({ [OPTIONS_KEY]: content }, () => resolve(undefined));
    });

  const getCurrentCheckBoxesStatus = () => {
    const entries = checkboxIds.map((id) => {
      const elem = document.getElementById(id) as HTMLInputElement;
      return [id, Boolean(elem?.checked)];
    });
    return Object.fromEntries(entries);
  };

  const setInitialCheckboxesState = async () => {
    const options = ((await getOptions()) || {}) as Partial<Record<CheckBoxId, boolean>>;

    checkboxIds.forEach((id) => {
      const elem = document.getElementById(id) as HTMLInputElement;
      elem.checked = options[id] ?? true;
    });
  };

  const addChaosSearchOptionsListeners = () => {
    checkboxIds
      .map((id) => document.getElementById(id))
      .forEach((elem) =>
        elem?.addEventListener('change', () => saveOptions(getCurrentCheckBoxesStatus()))
      );
  };

  const start = async () => {
    setInitialCheckboxesState();
    addChaosSearchOptionsListeners();
    addChaosSearchExpandCollapseListeners();
  };

  document.addEventListener('DOMContentLoaded', start);
})();
