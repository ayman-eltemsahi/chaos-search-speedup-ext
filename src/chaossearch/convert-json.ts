const mainConvert = (key: string, val: any, level = 0) => {
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

const convertUtil = (item: any, level = 0) => {
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

  const output: string[] = [
    `<ul data-level="${level}" class="type-object">`,
    ...Object.keys(item).map((key) => {
      return `<li>${mainConvert(Array.isArray(item) ? '' : key, item[key], level)},</li>`;
    }),
    `</ul>`,
  ];

  return output.join('');
};

export const convert = (item: any) => mainConvert('', item);
