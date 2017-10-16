import localforage from 'localforage';
import Worker from 'worker-loader!./calendar-worker.js';

export const fetchMonth = (year, month) => {
  return new Promise(async (resolve, reject) => {
    const worker = new Worker();
    worker.postMessage({ action: 'calculateMonth', year, month});
    worker.onmessage = (e) => {
      console.log('Message from worker');
      console.log(e.data);
    }
  });
}