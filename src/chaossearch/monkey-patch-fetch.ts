const injectScript = (filePath: string, tag: string) => {
  var node = document.getElementsByTagName(tag)[0];
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', filePath);
  node.appendChild(script);
};

export const monkeyPatchFetch = () => {
  injectScript(chrome.runtime.getURL('monkey-patch-fetch.js'), 'body');
};
