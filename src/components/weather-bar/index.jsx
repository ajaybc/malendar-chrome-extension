import { h, Component } from 'preact';
import { LOADING, SUCCESS, ERROR } from '../../constants/loading-status';

import style from './style.css';

import WeatherIcon from '../weather-icon';
import weatherDistricts from '../../constants/weather-districts';


export default class extends Component {
  constructor(props) {
    super(props);
    // this.onChange = this.onChange.bind(this);
    this.setState({
      editMode: false,
      //weatherCity: props.weatherCity
    });
  }

  componentWillMount() {
    if (this.props.settings.weatherCity) {
      this.setState({
        weatherCity: this.props.settings.weatherCity
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps.weatherCity', nextProps.weatherCity);
    if (nextProps.settings.weatherCity !== this.props.settings.weatherCity) {
      this.setState({
        weatherCity: nextProps.settings.weatherCity
      })
    }
    //console.log(nextProps);
  }

  onChange = (e) => {
    //console.log(e.target.value);
    this.setState({
      weatherCity: e.target.value
    });
  }

  onSubmit = (e) => {
    //console.log(this.props);
    this.props.onWeatherCityChange({...this.props.settings, weatherCity: this.state.weatherCity});
    this.setState({
      editMode: false
    })
  }

  render (props, state) {
    //console.log('weatherDistricts', weatherDistricts);
    // const forecast = props.weather.data.forecast.slice(1, 4);
    return (
      <div id={style.container}>
        <div id={style.inner}>
          {
            props.weather.status === SUCCESS && <div id={style.weatherBlockWrap}>
              {props.weather.data.forecast.slice(1, 4).map((item) => <div className={style.weatherBlock} title={item.text}>
                <div className={style.left}>
                  <WeatherIcon code={item.code} />
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
          }
          {
            props.weather.status === LOADING && <div id={style.loading}>
              <i class="fa fa-refresh fa-spin" aria-hidden="true"></i>
            </div>
          }
        </div>
        
        {
          !state.editMode && state.weatherCity &&
          <div id={style.cityContainer}>
            <a onClick={() => this.setState({ editMode:true })}>
              <span id={style.cityName}>{weatherDistricts[state.weatherCity].malayalamName} </span>
              <i class="fa fa-cog" aria-hidden="true"></i>
            </a>
          </div>
        }


        {
          state.editMode &&
          <div id={style.cityEditContainer}>
            <select onChange={this.onChange} value={state.weatherCity}>
              { 
                Object.keys(weatherDistricts).map((district, i) => 
                  <option key={i} value={district}>{ weatherDistricts[district].malayalamName } </option>
                )
              }
            </select>
            <input type="submit" value="OK" onClick={this.onSubmit} />
          </div>
        }
      </div>
    );
  }
}