import moment from 'moment';
import Kollavarsham from 'kollavarsham';
import SunCalc from 'suncalc';

var options = {
  system: 'SuryaSiddhanta',
  latitude: 9.988332,
  longitude: 76.291226,
  outputFormat: 'verbose'
};
var kollavarsham = new Kollavarsham(options);

onmessage = function(e) {
  console.log('Message received from main script');
  if (e.data.action === 'calculateMonth') {
    const start = performance.now();
    const days = calculateMonth(parseInt(e.data.year), parseInt(e.data.month));
    // console.log(performance.now() - start);
    postMessage({ year: e.data.year, month: e.data.month, days});
  }
}

function calculateMonth(year, month) {
  const days = [];
  const n = daysInMonth(year, month);
  console.log('Days : ', n);
  const d = new Date(year, month - 1, 1);
  for (let i = 0; i < n; i++) {
    d.setDate(i + 1);
    const todayInMalayalamEra = kollavarsham.fromGregorianDate(d);
    //console.log(todayInMalayalamEra);
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
        month: todayInMalayalamEra.month,
        year: todayInMalayalamEra.year,
        date: todayInMalayalamEra.date,
      },
      saka: {
        date: todayInMalayalamEra.sakaDate.date,
        month: todayInMalayalamEra.sakaDate.month,
      }
    }
    //console.log(newD);
    days.push({...newD, ...checkSpeciality(newD)});
  }
  // console.log(days);
  return days;
}

function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function getWeekOfMonth(d) {
  const date = d.getDate();
  const day = d.getDay();

  return Math.ceil((date - 1 - day) / 7) + 1;
}

function checkSpeciality(dayDetails) {
  let isHoliday = false;
  const specialities = [];

  if (isSunday(dayDetails)) {
    isHoliday = true;
  } else if (isSecondSaturday(dayDetails)) {
    console.log('Second saturday');
    isHoliday = true;
  }

  if (isRepublicDay(dayDetails)) {
    isHoliday = true;
    specialities.push('റിപ്പബ്ലിക്ക് ഡേ');
  } else if (isVishu(dayDetails)) {
    isHoliday = true;
    specialities.push('വിഷു');
  }

  if (isAmbedkarDay(dayDetails)) {
    specialities.push('അംബേദ്‌കർ ജയന്തി');
  }

  if (isKarkadakavavu(dayDetails)) {
    specialities.push('കർക്കിടക വാവ്');
  }

  if (isIndependanceDay(dayDetails)) {
    isHoliday = true;
    specialities.push('സ്വാതന്ത്ര്യ ദിനം');
  } else if (isGandhiJayanthi(dayDetails)) {
    isHoliday = true;
    specialities.push('ഗാന്ധി ജയന്തി');
  } else if (isChildrensDay(dayDetails)) {
    specialities.push('ശിശു ദിനം');
  }

  if (isFirstOnam(dayDetails)) {
    isHoliday = true;
    specialities.push('ഒന്നാം ഓണം');
  } else if (isThiruOnam(dayDetails)) {
    isHoliday = true;
    specialities.push('തിരുവോണം');
  } else if (isThirdOnam(dayDetails)) {
    isHoliday = true;
    specialities.push('മൂന്നാം ഓണം');
  }

  if (isSrinarayanaJayanthi(dayDetails)) {
    specialities.push('ശ്രീനാരായണ ജയന്തി');
  } else if (isSrinarayanaSamadhi(dayDetails)) {
    specialities.push('ശ്രീനാരായണ സമാധി');
  }

  if (isMahanavami(dayDetails)) {
    isHoliday = true;
    specialities.push('മഹാനവമി');
  } else if (isVijayadashami(dayDetails)) {
    isHoliday = true;
    specialities.push('വിജയദശമി');
  }
  
  if (isChristmas(dayDetails)) {
    isHoliday = true;
    specialities.push('ക്രിസ്തുമസ്');
  } else {
    if (isNewYear(dayDetails)) {
      isHoliday = true;
      specialities.push('നവവത്സര ദിനം');
    }
  }

  return {
    isHoliday,
    specialities,
  }
}

function isSunday(dayDetails) {
  if (dayDetails.gregorian.day === 0) {
    return true;
  }
  return false;
}

function isSecondSaturday(dayDetails) {
  // console.log(dayDetails.gregorian.day, dayDetails.gregorian.weekOfMonth);
  if (dayDetails.gregorian.day === 6 && dayDetails.gregorian.weekOfMonth === 2) {
    return true;
  }
  return false;
}

function isRepublicDay(dayDetails) {
  if (dayDetails.gregorian.month === 1 && dayDetails.gregorian.date === 26) {
    return true;
  }
  return false;
}

function isMaundyThrusday(dayDetails) {
  const easter = getEasterDate(dayDetails.gregorian.year);
  if (dayDetails.gregorian.month === (easter.month - 1) && dayDetails.gregorian.date === (easter.date - 3)) {
    return false;
  }
  return false;
}

function isGoodFriday(dayDetails) {
  const easter = getEasterDate(dayDetails.gregorian.year);
  if (dayDetails.gregorian.month === (easter.month - 1) && dayDetails.gregorian.date === (easter.date - 2)) {
    return false;
  }
  return false;
}

function isEaster(dayDetails) {
  const easter = getEasterDate(dayDetails.gregorian.year);
  if (dayDetails.gregorian.month === (easter.month - 1) && dayDetails.gregorian.date === easter.date) {
    return false;
  }
  return false;
}

function isKarkadakavavu(dayDetails) {
  // console.log(dayDetails.malayalam.nakshatram, dayDetails.gregorian.date);
  if (dayDetails.malayalam.month === 12) {
    const minPhase = SunCalc.getMoonIllumination(new Date(dayDetails.gregorian.year, dayDetails.gregorian.month - 1, dayDetails.gregorian.date)).phase;
    const maxPhase = SunCalc.getMoonIllumination(new Date(dayDetails.gregorian.year, dayDetails.gregorian.month - 1, dayDetails.gregorian.date, 24, 59, 59)).phase;
    if (minPhase >= maxPhase) {
      return true;
    }
  }
  return false;
}

function isFirstOnam(dayDetails) {
  if (dayDetails.malayalam.month === 1 && dayDetails.malayalam.nakshatram === 'ഉത്രാടം') {
    return true;
  }
  return false;
}

function isThiruOnam(dayDetails) {
  if (dayDetails.malayalam.month === 1 && dayDetails.malayalam.nakshatram === 'തിരുവോണം') {
    return true;
  }
  return false;
}

function isThirdOnam(dayDetails) {
  if (dayDetails.malayalam.month === 1 && dayDetails.malayalam.nakshatram === 'അവിട്ടം') {
    return true;
  }
  return false;
}

function isSrinarayanaJayanthi(dayDetails) {
  if (dayDetails.malayalam.month === 1 && dayDetails.malayalam.nakshatram === 'ചതയം') {
    return true;
  }
  return false;
}

function isVishu(dayDetails) {
  if (dayDetails.malayalam.month === 9 && dayDetails.malayalam.date === 1) {
    return true;
  }
  return false;
}

function isAmbedkarDay(dayDetails) {
  if (dayDetails.malayalam.date === 14 && dayDetails.gregorian.month === 4) {
    return true;
  }
  return false;
}

function isSrinarayanaSamadhi(dayDetails) {
  if (dayDetails.malayalam.date === 5 && dayDetails.malayalam.month === 2) {
    return true;
  }
  return false;
}

function isMahanavami(dayDetails) {
  if (dayDetails.saka.date === 9 && dayDetails.saka.month === 6) {
    return true;
  }
  return false;
}

function isVijayadashami(dayDetails) {
  if (dayDetails.saka.date === 10 && dayDetails.saka.month === 6) {
    return true;
  }
  return false;
}

function isIndependanceDay(dayDetails) {
  if (dayDetails.gregorian.date === 15 && dayDetails.gregorian.month === 8) {
    return true;
  }
  return false;
}

function isGandhiJayanthi(dayDetails) {
  if (dayDetails.gregorian.date === 2 && dayDetails.gregorian.month === 10) {
    return true;
  }
  return false;
}

function isChildrensDay(dayDetails) {
  if (dayDetails.gregorian.date === 14 && dayDetails.gregorian.month === 11) {
    return true;
  }
  return false;
}

function isChristmas(dayDetails) {
  if (dayDetails.gregorian.date === 25 && dayDetails.gregorian.month === 12) {
    return true;
  }
  return false;
}

function isNewYear(dayDetails) {
  if (dayDetails.gregorian.date === 1 && dayDetails.gregorian.month === 1) {
    return true;
  }
  return false;
}

//Gets the easter date for a particular year. Source : https://stackoverflow.com/a/1284335/923109
function getEasterDate(Y) {
  var C = Math.floor(Y/100);
  var N = Y - 19*Math.floor(Y/19);
  var K = Math.floor((C - 17)/25);
  var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
  I = I - 30*Math.floor((I/30));
  I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
  var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);
  J = J - 7*Math.floor(J/7);
  var L = I - J;
  var M = 3 + Math.floor((L + 40)/44);
  var D = L + 28 - 31*Math.floor(M/4);

  return {
    'month' : M,
    'date' : D,
  }
}