type Fetch = typeof window.fetch;
const originalFetch: Fetch = window.fetch;

type PatternInput = (args: Request) => boolean;

const CACHE_FILTERS: PatternInput[] = [
  ({ url, method }) =>
    method === 'GET' &&
    url.startsWith(
      'https://klarna-eu.chaossearch.io/kibana/api/index_patterns/_fields_for_wildcard'
    ),
  ({ url, method }) =>
    method === 'GET' &&
    url.startsWith('https://klarna-eu.chaossearch.io/kibana/api/saved_objects/_find'),
];

const shouldCache = (req: Request) => CACHE_FILTERS.find((pattern) => pattern(req));

const makeKey = (req: Request) => `CUSTOM_EXTENSION:${req.method}:${req.url}`;

const makeResponse = (content: unknown) =>
  new Response(typeof content === 'string' ? content : JSON.stringify(content), {
    status: 200,
    statusText: 'OK',
  });

const getCache = (req: Request) => localStorage.getItem(makeKey(req));

const fetchAndCache: Fetch = async (input, init) => {
  const response = await originalFetch(input, init);
  const result = await response.json();
  localStorage.setItem(makeKey(input as Request), JSON.stringify(result));

  return makeResponse(result);
};

const patchedFetch: Fetch = async (input, init) => {
  const req = input as Request;

  // Can we cache it?
  if (!shouldCache(req)) {
    // no we cannot 😔
    return await originalFetch(input, init);
  }

  //     Yes, we can! 🎉🎉

  const cache = getCache(req);
  if (!cache) {
    // no previous cache, call the backend 😭😭 and cache the response
    return await fetchAndCache(input, init);
  }

  // it's been cached, yay!! 😎
  fetchAndCache(input, init); // cache it in the background so that the data is not stale
  return makeResponse(cache);
};

(window as any).fetch = patchedFetch;
