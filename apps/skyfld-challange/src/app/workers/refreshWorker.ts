let intervalId: NodeJS.Timeout | null = null;
const INTERVAL_LENGTH = 30000;
// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', (event: MessageEvent) => {
  if (event.data === 'start') {
    intervalId = setInterval(() => {
      // eslint-disable-next-line no-restricted-globals
      self.postMessage('fetchData');
    }, INTERVAL_LENGTH);
  } else if (event.data === 'stop') {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
});