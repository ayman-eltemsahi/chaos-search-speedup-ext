/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./dist/ui/popup.js ***!
  \**************************/

(function () {
    const checkboxIds = [
        'chaos-search-expand-lines',
        'chaos-search-copy-icons',
        'chaos-search-prettify-json',
        'chaos-search-color-borders',
    ];
    const OPTIONS_KEY = 'CHAOS_SEARCH_OPTIONS_KEY';
    const sendMessage = (msg, callback = () => { }) => chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, msg, callback);
    });
    const addChaosSearchExpandCollapseListeners = () => {
        const expandBtn = document.getElementById('chaos-search-expand-all');
        const collapseBtn = document.getElementById('chaos-search-collapse-all');
        expandBtn === null || expandBtn === void 0 ? void 0 : expandBtn.addEventListener('click', () => sendMessage({ type: 'CHAOS_SEARCH_EXPAND_ALL' }));
        collapseBtn === null || collapseBtn === void 0 ? void 0 : collapseBtn.addEventListener('click', () => sendMessage({ type: 'CHAOS_SEARCH_COLLAPSE_ALL' }));
    };
    const getOptions = () => new Promise((resolve) => {
        chrome.storage.local.get([OPTIONS_KEY], (result) => resolve(result[OPTIONS_KEY]));
    });
    const saveOptions = (content) => new Promise((resolve) => {
        chrome.storage.local.set({ [OPTIONS_KEY]: content }, () => resolve(undefined));
    });
    const getCurrentCheckBoxesStatus = () => {
        const entries = checkboxIds.map((id) => {
            const elem = document.getElementById(id);
            return [id, Boolean(elem === null || elem === void 0 ? void 0 : elem.checked)];
        });
        return Object.fromEntries(entries);
    };
    const setInitialCheckboxesState = async () => {
        const options = ((await getOptions()) || {});
        checkboxIds.forEach((id) => {
            var _a;
            const elem = document.getElementById(id);
            elem.checked = (_a = options[id]) !== null && _a !== void 0 ? _a : true;
        });
    };
    const addChaosSearchOptionsListeners = () => {
        checkboxIds
            .map((id) => document.getElementById(id))
            .forEach((elem) => elem === null || elem === void 0 ? void 0 : elem.addEventListener('change', () => saveOptions(getCurrentCheckBoxesStatus())));
    };
    const start = async () => {
        setInitialCheckboxesState();
        addChaosSearchOptionsListeners();
        addChaosSearchExpandCollapseListeners();
    };
    document.addEventListener('DOMContentLoaded', start);
})();

/******/ })()
;