import style from './style.css';

import WeatherIcon from '../weather-icon';

export default function (props) {
  const forecast = props.forecast.slice(1, 4);
  return (
    <div id={style.container}>
      <div id={style.inner}>
        {forecast.map((item) => <div className={style.weatherBlock}>
          <div className={style.left}>
            <WeatherIcon code={item.code}/>
          </div>
          <div className={style.right}>
            <div className={style.tempContainer}>
              <div className={style.maxTemp}>{item.high}°</div>
              <div className={style.minTemp}>{item.low}°</div>
            </div>
            <div className={style.day}>
              {item.day}
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}