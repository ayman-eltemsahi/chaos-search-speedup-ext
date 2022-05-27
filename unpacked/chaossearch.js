/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/chaossearch/border-color.js":
/*!******************************************!*\
  !*** ./dist/chaossearch/border-color.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.colorBorders = exports.getColorOfStatusCode = exports.getColorOfLevel = void 0;
const utils_1 = __webpack_require__(/*! ./utils */ "./dist/chaossearch/utils.js");
const GREEN = 'green';
const YELLOW = 'yellow';
const BLUE = 'blue';
const RED = 'red';
const HEAVY_RED = '#730c05';
const WHITE = 'white';
const getElements = () => Array.from(document.querySelectorAll('table.kbn-table > tbody > tr'));
const getColorOfLevel = (level) => {
    if (!level)
        return;
    switch (level.toLowerCase()) {
        case 'info':
            return GREEN;
        case 'warn':
        case 'warning':
            return YELLOW;
        case 'error':
            return RED;
    }
};
exports.getColorOfLevel = getColorOfLevel;
const getColorOfStatusCode = (codeStr) => {
    if (!codeStr)
        return;
    const code = Number.parseInt(codeStr);
    if (code >= 200 && code < 300)
        return GREEN;
    if (code >= 300 && code < 400)
        return BLUE;
    if (code >= 400 && code < 500)
        return RED;
    if (code > 500)
        return HEAVY_RED;
};
exports.getColorOfStatusCode = getColorOfStatusCode;
const colorBorders = () => {
    getElements().forEach((elem) => {
        var _a, _b;
        const statusCode = (_a = elem.querySelector(utils_1.dataTestSubj('line.meta.http_status_code'))) === null || _a === void 0 ? void 0 : _a.innerHTML;
        const level = (_b = elem.querySelector(utils_1.dataTestSubj('line.level'))) === null || _b === void 0 ? void 0 : _b.innerHTML;
        const color = exports.getColorOfStatusCode(statusCode) || exports.getColorOfLevel(level);
        if (!color)
            return;
        elem.style.borderLeft = `15px solid ${color}`;
    });
};
exports.colorBorders = colorBorders;


/***/ }),

/***/ "./dist/chaossearch/change-title.js":
/*!******************************************!*\
  !*** ./dist/chaossearch/change-title.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.changeTitle = void 0;
const changeTitle = () => {
    const elem = document.querySelector('.dscIndexPattern__container .euiButtonEmpty__text');
    if (!elem)
        return;
    const value = (elem.innerHTML || '').replace(/^systemid-logs_/, '').replace(/_90-days$/, '');
    if (!value)
        return;
    document.title = value;
};
exports.changeTitle = changeTitle;


/***/ }),

/***/ "./dist/chaossearch/convert-json.js":
/*!******************************************!*\
  !*** ./dist/chaossearch/convert-json.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convert = void 0;
const mainConvert = (key, val, level = 0) => {
    level++;
    const k = convertUtil(val, level);
    const isArray = val && Array.isArray(val);
    const isObj = val && typeof val === 'object';
    if (isArray && val.length === 0) {
        return `${key}: []`;
    }
    if (isObj && Object.keys(val).length === 0) {
        return `${key}: {}`;
    }
    const keyStringified = key.length > 0 ? `${key} : ` : '';
    if (isObj || isArray) {
        const ch1 = isArray ? '[' : '{';
        const ch2 = isArray ? ']' : '}';
        return `<a class="list-link" href="javascript:void(0)">${keyStringified}${ch1}<span class="items-ph hide">1 item</span></a>${k}${ch2}`;
    }
    return `${keyStringified}${k}`;
};
const convertUtil = (item, level = 0) => {
    const t = typeof item;
    if (item === null || item === undefined) {
        return `<span class="type-${item}">${item}</span>`;
    }
    if (t == 'string') {
        return `<span class="type-${t}">"${item}"</span>`;
    }
    if (t === 'number' || t == 'boolean') {
        return `<span class="type-${t}">${item}</span>`;
    }
    const output = [
        `<ul data-level="${level}" class="type-object">`,
        ...Object.keys(item).map((key) => {
            return `<li>${mainConvert(Array.isArray(item) ? '' : key, item[key], level)},</li>`;
        }),
        `</ul>`,
    ];
    return output.join('');
};
const convert = (item) => mainConvert('', item);
exports.convert = convert;


/***/ }),

/***/ "./dist/chaossearch/custom-css.js":
/*!****************************************!*\
  !*** ./dist/chaossearch/custom-css.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectCSS = void 0;
const styles_1 = __webpack_require__(/*! ../utils/styles */ "./dist/utils/styles.js");
const utils_1 = __webpack_require__(/*! ./utils */ "./dist/chaossearch/utils.js");
const styles_2 = __webpack_require__(/*! ../utils/styles */ "./dist/utils/styles.js");
const JSON_VIEWER_MAX_HEIGHT = '600px';
const ROWS = {
    BOLD: ['KlarnaPartition', 'Timestamp'],
    BOLD_UNDERLINE: [
        'line.message',
        'line.meta.correlation_id',
        'line.correlation_id',
        'line.meta.http_method',
        'line.meta.http_url',
        'line.meta.klarna_persona_id',
        'line.meta.http_status_code',
        'line.meta.personaId',
    ],
    GREEN: ['Timestamp', 'line.meta.responseTime'],
    GRAYED: ['_index', '_source'],
    HIDDEN: ['_type', '_score', '_id'],
};
const injectCSS = () => {
    styles_1.addStyles(`
    ${styles_2.COPY_ICON_STYLES}

    .euiBody--collapsibleNavIsDocked {
      padding-left: 40px !important;
    }

    .euiCollapsibleNav {
      width: 40px !important;
    }

    ${utils_1.dataTestSubjList(ROWS.BOLD_UNDERLINE)} {
      font-weight: bold;
      border-bottom: 1px solid #ccc;
    }

    ${utils_1.dataTestSubjList(ROWS.BOLD)} {
      font-weight: bold;
    }

    ${utils_1.dataTestSubjList(ROWS.GRAYED)} {
      color: #ccc !important;
    }

    ${utils_1.dataTestSubjList(ROWS.GREEN)} {
      color: green !important;
    }

    ${utils_1.trDataTestSubjList(ROWS.HIDDEN)} {
      display:none;
    }

    .json-viewer {
      color: #000;
      max-height: ${JSON_VIEWER_MAX_HEIGHT};
      overflow: scroll;
    }

    .json-viewer ul {
      list-style-type: none;
      margin: 0;
      margin: 0 0 0 1px;
      border-left: 1px dotted #ccc;
      padding-left: 2em;
    }

    .json-viewer .hide {
      display: none;
    }

    .json-viewer .type-string {
      color: #0B7500;
    }

    .json-viewer .type-date {
      color: #CB7500;
    }

    .json-viewer .type-boolean {
      color: #1A01CC;
      font-weight: bold;
    }

    .json-viewer .type-number {
      color: #1A01CC;
    }

    .json-viewer .type-null, .json-viewer .type-undefined {
      color: #90a;
    }

    .json-viewer .items-ph {
      color: #aaa;
      padding: 0 1em;
    }

    .json-viewer .items-ph:hover {
      text-decoration: underline;
    }


    .json-viewer a.list-link {
      color: #000;
      text-decoration: none;
      position: relative;
    }

    .json-viewer a.list-link:before {
      content: "";
    }
  `);
};
exports.injectCSS = injectCSS;


/***/ }),

/***/ "./dist/chaossearch/expand.js":
/*!************************************!*\
  !*** ./dist/chaossearch/expand.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.expand = exports.forceCollapseAll = exports.forceExpandAll = void 0;
const run_async_1 = __webpack_require__(/*! ../utils/run-async */ "./dist/utils/run-async.js");
const getExpandButtons = () => Array.from(document.querySelectorAll('.euiButtonIcon.euiButtonIcon--text'));
const forceExpandAll = () => {
    console.log('🔽 forceExpandAll');
    getExpandButtons()
        .filter((elem) => elem.getAttribute('aria-expanded') === 'false')
        .forEach((elem) => run_async_1.runAsync(() => { var _a; return (_a = elem.click) === null || _a === void 0 ? void 0 : _a.call(elem); }));
};
exports.forceExpandAll = forceExpandAll;
const forceCollapseAll = () => {
    console.log('▶️ forceCollapseAll');
    getExpandButtons()
        .filter((elem) => elem.getAttribute('aria-expanded') === 'true')
        .forEach((elem) => run_async_1.runAsync(() => { var _a; return (_a = elem.click) === null || _a === void 0 ? void 0 : _a.call(elem); }));
};
exports.forceCollapseAll = forceCollapseAll;
const expand = () => {
    getExpandButtons()
        .filter((elem) => elem.getAttribute('aria-custom-expanded') !== 'true')
        .forEach((elem) => {
        run_async_1.runAsync(() => {
            var _a;
            (_a = elem.click) === null || _a === void 0 ? void 0 : _a.call(elem);
            elem.setAttribute('aria-custom-expanded', 'true');
        });
    });
};
exports.expand = expand;


/***/ }),

/***/ "./dist/chaossearch/guard.js":
/*!***********************************!*\
  !*** ./dist/chaossearch/guard.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.guard = void 0;
const OPTIONS_KEY = 'CHAOS_SEARCH_OPTIONS_KEY';
const guard = (optionId, handler) => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([OPTIONS_KEY], (result) => {
            var _a;
            if (((_a = result[OPTIONS_KEY]) === null || _a === void 0 ? void 0 : _a[optionId]) === false)
                return resolve(undefined);
            resolve(handler());
        });
    });
};
exports.guard = guard;


/***/ }),

/***/ "./dist/chaossearch/index-pattern-selector.js":
/*!****************************************************!*\
  !*** ./dist/chaossearch/index-pattern-selector.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fixIndexPatternSelector = void 0;
const fixIndexPatternSelector = () => {
    var _a;
    const elem = (_a = document.querySelector(`.euiSelectable[data-test-subj="indexPattern-switcher"`)) === null || _a === void 0 ? void 0 : _a.parentElement;
    if (!elem)
        return;
    elem.style.width = '520px';
};
exports.fixIndexPatternSelector = fixIndexPatternSelector;


/***/ }),

/***/ "./dist/chaossearch/monkey-patch-fetch.js":
/*!************************************************!*\
  !*** ./dist/chaossearch/monkey-patch-fetch.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.monkeyPatchFetch = void 0;
const injectScript = (filePath, tag) => {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', filePath);
    node.appendChild(script);
};
const monkeyPatchFetch = () => {
    injectScript(chrome.extension.getURL('monkey-patch-fetch.js'), 'body');
};
exports.monkeyPatchFetch = monkeyPatchFetch;


/***/ }),

/***/ "./dist/chaossearch/prettify-json.js":
/*!*******************************************!*\
  !*** ./dist/chaossearch/prettify-json.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prettifyJSON = void 0;
const run_async_1 = __webpack_require__(/*! ../utils/run-async */ "./dist/utils/run-async.js");
const convert_json_1 = __webpack_require__(/*! ./convert-json */ "./dist/chaossearch/convert-json.js");
const utils_1 = __webpack_require__(/*! ./utils */ "./dist/chaossearch/utils.js");
const prettifyJSON = () => {
    const elements = document.querySelectorAll(utils_1.dataTestSubj('_rawJson'));
    Array.from(elements).forEach((elem) => run_async_1.runAsync(() => {
        var _a, _b;
        if (!elem || elem.getAttribute('aria-custom-prettified') === 'true')
            return;
        elem.setAttribute('aria-custom-prettified', 'true');
        const valueElement = elem;
        const content = JSON.parse(valueElement.innerHTML);
        if (!content)
            return;
        const newText = `<pre class='json-viewer'>${convert_json_1.convert(content)}</pre>`;
        valueElement.innerHTML = newText;
        const expandBtnElement = (_a = valueElement === null || valueElement === void 0 ? void 0 : valueElement.previousSibling) === null || _a === void 0 ? void 0 : _a.querySelector('.euiButtonIcon.euiButtonIcon--primary');
        if (expandBtnElement && (valueElement === null || valueElement === void 0 ? void 0 : valueElement.getAttribute('aria-custom-expanded')) !== 'true') {
            valueElement === null || valueElement === void 0 ? void 0 : valueElement.setAttribute('aria-custom-expanded', 'true');
            (_b = expandBtnElement.click) === null || _b === void 0 ? void 0 : _b.call(expandBtnElement);
        }
    }));
};
exports.prettifyJSON = prettifyJSON;


/***/ }),

/***/ "./dist/chaossearch/utils.js":
/*!***********************************!*\
  !*** ./dist/chaossearch/utils.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.trDataTestSubjList = exports.dataTestSubjList = exports.dataTestSubj = void 0;
const dataTestSubj = (v) => `.kbnDocViewer__value[data-test-subj="tableDocViewRow-${v}-value"]`;
exports.dataTestSubj = dataTestSubj;
const dataTestSubjList = (items) => items.map(exports.dataTestSubj).join(',');
exports.dataTestSubjList = dataTestSubjList;
const trDataTestSubjList = (items) => items.map((item) => `tr[data-test-subj="tableDocViewRow-${item}"]`).join(',');
exports.trDataTestSubjList = trDataTestSubjList;


/***/ }),

/***/ "./dist/consts.js":
/*!************************!*\
  !*** ./dist/consts.js ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CLASS_NAMES = void 0;
exports.CLASS_NAMES = {
    copy_icon: 'chaos-search-speedup-ext__copy_icon',
};


/***/ }),

/***/ "./dist/utils/clipboard.js":
/*!*********************************!*\
  !*** ./dist/utils/clipboard.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.attachCopyIconToNode = exports.markHasCopyIcon = exports.doesNodeHaveCopyIcon = exports.createCopyIcon = exports.copyToClipboard = void 0;
const consts_1 = __webpack_require__(/*! ../consts */ "./dist/consts.js");
const copyToClipboard = (msg) => {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = msg;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
};
exports.copyToClipboard = copyToClipboard;
const createCopyIcon = (text) => {
    const copyElem = document.createElement('span');
    copyElem.className = consts_1.CLASS_NAMES.copy_icon;
    copyElem.textContent = ' 📋';
    copyElem.style.cursor = 'pointer';
    copyElem.style.zIndex = '10000';
    copyElem.onclick = () => {
        setTimeout(() => exports.copyToClipboard(text), 0);
    };
    return copyElem;
};
exports.createCopyIcon = createCopyIcon;
const doesNodeHaveCopyIcon = (node) => (node === null || node === void 0 ? void 0 : node.getAttribute('extension__has_copy_icon')) === '1';
exports.doesNodeHaveCopyIcon = doesNodeHaveCopyIcon;
const markHasCopyIcon = (node) => node === null || node === void 0 ? void 0 : node.setAttribute('extension__has_copy_icon', '1');
exports.markHasCopyIcon = markHasCopyIcon;
const attachCopyIconToNode = (node, copyIcon) => {
    var _a;
    if (exports.doesNodeHaveCopyIcon(node))
        return;
    exports.markHasCopyIcon(node);
    console.log('📋 inserting copy icon');
    (_a = node.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(copyIcon, node.nextSibling);
};
exports.attachCopyIconToNode = attachCopyIconToNode;


/***/ }),

/***/ "./dist/utils/index.js":
/*!*****************************!*\
  !*** ./dist/utils/index.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./clipboard */ "./dist/utils/clipboard.js"), exports);
__exportStar(__webpack_require__(/*! ./run-async */ "./dist/utils/run-async.js"), exports);
__exportStar(__webpack_require__(/*! ./run-periodically */ "./dist/utils/run-periodically.js"), exports);
__exportStar(__webpack_require__(/*! ./selectors */ "./dist/utils/selectors.js"), exports);
__exportStar(__webpack_require__(/*! ./throttle */ "./dist/utils/throttle.js"), exports);


/***/ }),

/***/ "./dist/utils/run-async.js":
/*!*********************************!*\
  !*** ./dist/utils/run-async.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.runAsync = void 0;
const runAsync = (fn) => new Promise((resolve, reject) => {
    try {
        setTimeout(() => {
            resolve(fn());
        }, 0);
    }
    catch (e) {
        reject(e);
    }
});
exports.runAsync = runAsync;


/***/ }),

/***/ "./dist/utils/run-periodically.js":
/*!****************************************!*\
  !*** ./dist/utils/run-periodically.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.runPeriodically = void 0;
const runPeriodically = (ms, inputFun) => {
    const retObj = { id: undefined };
    const fn = () => {
        inputFun();
        retObj.id = setTimeout(fn, ms);
    };
    fn();
    return retObj;
};
exports.runPeriodically = runPeriodically;


/***/ }),

/***/ "./dist/utils/selectors.js":
/*!*********************************!*\
  !*** ./dist/utils/selectors.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.waitForElement = void 0;
const DEFAULT_TIMEOUT = 10000;
const waitForElement = (selector, { token, timeoutMs } = {}) => {
    const timeout = timeoutMs || DEFAULT_TIMEOUT;
    const start = +new Date();
    return new Promise((resolve, reject) => {
        const checker = () => {
            if (token === null || token === void 0 ? void 0 : token.isCancelled)
                return resolve(undefined);
            const elem = document.querySelector(selector);
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
exports.waitForElement = waitForElement;


/***/ }),

/***/ "./dist/utils/styles.js":
/*!******************************!*\
  !*** ./dist/utils/styles.js ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addStyles = exports.COPY_ICON_STYLES = void 0;
const consts_1 = __webpack_require__(/*! ../consts */ "./dist/consts.js");
exports.COPY_ICON_STYLES = `
.${consts_1.CLASS_NAMES.copy_icon} {
  cursor: pointer;
  display: inline-block;
  transition: transform 0.1s ease;
  padding-right: 3px;
  padding-left: 3px;
}

.${consts_1.CLASS_NAMES.copy_icon}:active {
  transform: scale(0.7);
}
`;
const addStyles = (styles) => {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(styles));
    (document.head || document.getElementsByTagName('head')[0]).append(style);
};
exports.addStyles = addStyles;


/***/ }),

/***/ "./dist/utils/throttle.js":
/*!********************************!*\
  !*** ./dist/utils/throttle.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.throttle = void 0;
const throttle = (ms, fn) => {
    let timeout;
    const trigger = (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), ms);
    };
    const cancel = () => {
        clearTimeout(timeout);
    };
    return { trigger, cancel };
};
exports.throttle = throttle;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***********************************!*\
  !*** ./dist/chaossearch/index.js ***!
  \***********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const utils_1 = __webpack_require__(/*! ../utils */ "./dist/utils/index.js");
const custom_css_1 = __webpack_require__(/*! ./custom-css */ "./dist/chaossearch/custom-css.js");
const utils_2 = __webpack_require__(/*! ./utils */ "./dist/chaossearch/utils.js");
const expand_1 = __webpack_require__(/*! ./expand */ "./dist/chaossearch/expand.js");
const border_color_1 = __webpack_require__(/*! ./border-color */ "./dist/chaossearch/border-color.js");
const change_title_1 = __webpack_require__(/*! ./change-title */ "./dist/chaossearch/change-title.js");
const index_pattern_selector_1 = __webpack_require__(/*! ./index-pattern-selector */ "./dist/chaossearch/index-pattern-selector.js");
const monkey_patch_fetch_1 = __webpack_require__(/*! ./monkey-patch-fetch */ "./dist/chaossearch/monkey-patch-fetch.js");
const guard_1 = __webpack_require__(/*! ./guard */ "./dist/chaossearch/guard.js");
const prettify_json_1 = __webpack_require__(/*! ./prettify-json */ "./dist/chaossearch/prettify-json.js");
const clickRefreshData = () => {
    utils_1.runPeriodically(1000, () => {
        const btn = document.querySelector('.euiPage .euiButton--primary.euiButton--fill');
        btn === null || btn === void 0 ? void 0 : btn.click();
    });
};
const addCopyIconToMessage = () => {
    Array.from(document.querySelectorAll(utils_2.dataTestSubjList([
        'line.message',
        'line.correlation_id',
        'line.meta.correlation_id',
        'line.meta.klarna_persona_id',
        'line.meta.personaId',
        'line.meta.http_url',
    ])))
        .filter(Boolean)
        .forEach((node) => {
        utils_1.attachCopyIconToNode(node, utils_1.createCopyIcon(node.innerHTML || ''));
    });
};
const run = () => {
    monkey_patch_fetch_1.monkeyPatchFetch();
    custom_css_1.injectCSS();
    clickRefreshData();
    chrome.runtime.onMessage.addListener((msg) => {
        if ((msg === null || msg === void 0 ? void 0 : msg.type) === 'CHAOS_SEARCH_EXPAND_ALL')
            expand_1.forceExpandAll();
        if ((msg === null || msg === void 0 ? void 0 : msg.type) === 'CHAOS_SEARCH_COLLAPSE_ALL')
            expand_1.forceCollapseAll();
    });
    const throttledCopyIcons = utils_1.throttle(1000, addCopyIconToMessage);
    const throttledCall = utils_1.throttle(200, () => {
        change_title_1.changeTitle();
        index_pattern_selector_1.fixIndexPatternSelector();
        guard_1.guard('chaos-search-expand-lines', expand_1.expand);
        guard_1.guard('chaos-search-prettify-json', prettify_json_1.prettifyJSON);
        guard_1.guard('chaos-search-color-borders', border_color_1.colorBorders);
        guard_1.guard('chaos-search-copy-icons', () => throttledCopyIcons.trigger());
    });
    // waitForElement('.dscWrapper__content', { timeoutMs: 6000000 }).then((wrapper) => {
    utils_1.waitForElement('.coreSystemRootDomElement', { timeoutMs: 6000000 }).then((wrapper) => {
        wrapper === null || wrapper === void 0 ? void 0 : wrapper.addEventListener('DOMNodeInserted', () => throttledCall.trigger());
    });
};
run();

})();

/******/ })()
;