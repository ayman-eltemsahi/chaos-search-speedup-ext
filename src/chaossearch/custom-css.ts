import { addStyles } from '../utils/styles';
import { dataTestSubjList, trDataTestSubjList } from './utils';
import { COPY_ICON_STYLES } from '../utils/styles';

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

export const injectCSS = () => {
  addStyles(`
    ${COPY_ICON_STYLES}

    .euiBody--collapsibleNavIsDocked {
      padding-left: 40px !important;
    }

    .euiCollapsibleNav {
      width: 40px !important;
    }

    ${dataTestSubjList(ROWS.BOLD_UNDERLINE)} {
      font-weight: bold;
      border-bottom: 1px solid #ccc;
    }

    ${dataTestSubjList(ROWS.BOLD)} {
      font-weight: bold;
    }

    ${dataTestSubjList(ROWS.GRAYED)} {
      color: #ccc !important;
    }

    ${dataTestSubjList(ROWS.GREEN)} {
      color: green !important;
    }

    ${trDataTestSubjList(ROWS.HIDDEN)} {
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
