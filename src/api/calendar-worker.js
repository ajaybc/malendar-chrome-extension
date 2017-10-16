import moment from 'moment';
import Kollavarsham from 'kollavarsham';

var options = {
  system: 'SuryaSiddhanta',
  latitude: 10,
  longitude: 76.2,
  outputFormat: 'verbose'
};
var kollavarsham = new Kollavarsham(options);

onmessage = function(e) {
  console.log('Message received from main script');
  if (e.data.action === 'calculateMonth') {
    const days = calculateMonth(parseInt(e.data.year), parseInt(e.data.month));
    postMessage({ year: e.data.year, month: e.data.month, days});
  }
}

function calculateMonth(year, month) {
  const days = [];
  const n = daysInMonth(year, month);
  const d = new Date(year, month, 1);
  for (let i = 0; i < n; i++) {
    d.setDate(i + 1);
    const todayInMalayalamEra = kollavarsham.fromGregorianDate(d);
    //console.log(todayInMalayalamEra);
    //console.log(todayInMalayalamEra.naksatra);
    const newD = {
      gregorian: {
        date: d.getDate(),
        month,
        year,
        day: d.getDay(),
        weekOfMonth: getWeekOfMonth(d),
      },
      malayalam: {
        masam: todayInMalayalamEra.mlMasaName,
        nakshatram: todayInMalayalamEra.mlNaksatraName,
        divasam: todayInMalayalamEra.mlWeekdayName,
        year: todayInMalayalamEra.year,
      }
    }
    days.push(newD);
  }
  console.log(days);
  return days;
}

function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function getWeekOfMonth(date) {
  const d = date.getDate();
  return 1 | d / 7;
}