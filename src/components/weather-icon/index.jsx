import style from '../../style/weather-icons.css';

export default function (props) {
  return (
    <i className={getWeatherIconClass(props.code)}></i>
  );
}

function getWeatherIconClass(condid) {
  var icon = '';
  switch (condid) {
    case '0': icon = 'wi-tornado';
      break;
    case '1': icon = 'wi-storm-showers';
      break;
    case '2': icon = 'wi-tornado';
      break;
    case '3': icon = 'wi-thunderstorm';
      break;
    case '4': icon = 'wi-thunderstorm';
      break;
    case '5': icon = 'wi-snow';
      break;
    case '6': icon = 'wi-rain-mix';
      break;
    case '7': icon = 'wi-rain-mix';
      break;
    case '8': icon = 'wi-sprinkle';
      break;
    case '9': icon = 'wi-sprinkle';
      break;
    case '10': icon = 'wi-hail';
      break;
    case '11': icon = 'wi-showers';
      break;
    case '12': icon = 'wi-showers';
      break;
    case '13': icon = 'wi-snow';
      break;
    case '14': icon = 'wi-storm-showers';
      break;
    case '15': icon = 'wi-snow';
      break;
    case '16': icon = 'wi-snow';
      break;
    case '17': icon = 'wi-hail';
      break;
    case '18': icon = 'wi-hail';
      break;
    case '19': icon = 'wi-cloudy-gusts';
      break;
    case '20': icon = 'wi-fog';
      break;
    case '21': icon = 'wi-fog';
      break;
    case '22': icon = 'wi-fog';
      break;
    case '23': icon = 'wi-cloudy-gusts';
      break;
    case '24': icon = 'wi-cloudy-windy';
      break;
    case '25': icon = 'wi-thermometer';
      break;
    case '26': icon = 'wi-cloudy';
      break;
    case '27': icon = 'wi-night-cloudy';
      break;
    case '28': icon = 'wi-day-cloudy';
      break;
    case '29': icon = 'wi-night-cloudy';
      break;
    case '30': icon = 'wi-day-cloudy';
      break;
    case '31': icon = 'wi-night-clear';
      break;
    case '32': icon = 'wi-day-sunny';
      break;
    case '33': icon = 'wi-night-clear';
      break;
    case '34': icon = 'wi-day-sunny-overcast';
      break;
    case '35': icon = 'wi-hail';
      break;
    case '36': icon = 'wi-day-sunny';
      break;
    case '37': icon = 'wi-thunderstorm';
      break;
    case '38': icon = 'wi-thunderstorm';
      break;
    case '39': icon = 'wi-thunderstorm';
      break;
    case '40': icon = 'wi-storm-showers';
      break;
    case '41': icon = 'wi-snow';
      break;
    case '42': icon = 'wi-snow';
      break;
    case '43': icon = 'wi-snow';
      break;
    case '44': icon = 'wi-cloudy';
      break;
    case '45': icon = 'wi-lightning';
      break;
    case '46': icon = 'wi-snow';
      break;
    case '47': icon = 'wi-thunderstorm';
      break;
    case '3200': icon = 'wi-cloud';
      break;
    default: icon = 'wi-cloud';
      break;
  }

  return 'wi ' + icon;
}