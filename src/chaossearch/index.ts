import {
  attachCopyIconToNode,
  createCopyIcon,
  throttle,
  waitForElement,
  runPeriodically,
} from '../utils';
import { injectCSS } from './custom-css';
import { dataTestSubjList } from './utils';
import { expand, forceCollapseAll, forceExpandAll } from './expand';
import { colorBorders } from './border-color';
import { changeTitle } from './change-title';
import { fixIndexPatternSelector } from './index-pattern-selector';
import { monkeyPatchFetch } from './monkey-patch-fetch';
import { guard } from './guard';
import { prettifyJSON } from './prettify-json';

const clickRefreshData = () => {
  runPeriodically(1000, () => {
    const btn = document.querySelector(
      '.euiPage .euiButton--primary.euiButton--fill'
    ) as HTMLElement;

    btn?.click();
  });
};

const addCopyIconToMessage = () => {
  Array.from(
    document.querySelectorAll(
      dataTestSubjList([
        'line.message',
        'line.correlation_id',
        'line.meta.correlation_id',
        'line.meta.klarna_persona_id',
        'line.meta.personaId',
        'line.meta.http_url',
      ])
    )
  )
    .filter(Boolean)
    .forEach((node) => {
      attachCopyIconToNode(node as HTMLElement, createCopyIcon(node.innerHTML || ''));
    });
};

const run = () => {
  monkeyPatchFetch();
  injectCSS();
  clickRefreshData();

  chrome.runtime.onMessage.addListener((msg: { type: string }) => {
    if (msg?.type === 'CHAOS_SEARCH_EXPAND_ALL') forceExpandAll();
    if (msg?.type === 'CHAOS_SEARCH_COLLAPSE_ALL') forceCollapseAll();
  });

  const throttledCopyIcons = throttle(1000, addCopyIconToMessage);

  const throttledCall = throttle(200, () => {
    changeTitle();
    fixIndexPatternSelector();

    guard('chaos-search-expand-lines', expand);
    guard('chaos-search-prettify-json', prettifyJSON);
    guard('chaos-search-color-borders', colorBorders);
    guard('chaos-search-copy-icons', () => throttledCopyIcons.trigger());
  });

  // waitForElement('.dscWrapper__content', { timeoutMs: 6000000 }).then((wrapper) => {
  waitForElement('.coreSystemRootDomElement', { timeoutMs: 6000000 }).then((wrapper) => {
    wrapper?.addEventListener('DOMNodeInserted', () => throttledCall.trigger());
  });
};

run();
