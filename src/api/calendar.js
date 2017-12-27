import localforage from 'localforage';
import Worker from 'worker-loader!./calendar-worker.js';

export const fetchMonth = (year, month) => {
  return new Promise(async (resolve, reject) => {
    const localMonthData = await localforage.getItem(`calendar_${year}_${month}`);
    if (localMonthData) {
      //console.log('Got calendar data from localDB');
      resolve(localMonthData);
      return;
    }
    const worker = new Worker();
    worker.postMessage({ action: 'calculateMonth', year, month});
    worker.onmessage = (e) => {
      //console.log('Message from worker');
      //console.log(e.data);
      localforage.setItem(`calendar_${e.data.year}_${e.data.month}`, e.data);
      //console.log('saving calendar to localDB');
      resolve(e.data);
    }
  });
}