/* global chrome */
export const fetchApps = () => {
  return new Promise(async (resolve, reject) => {
    if (chrome && chrome.management) {
      chrome.management.getAll(function (extensions) {
        resolve(extensions.filter((item) => {
          return item.isApp === true;
        }));
      });
    }
  })
}