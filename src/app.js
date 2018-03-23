import './styles/reset.css'
import './styles/main.css';
import './styles/selectbox.css';
import './styles/weather-list.css';

import CitiesList from './model/citesList'
import WeatherList from './model/weatherList'
import ConstructPanel from './view/constructPanel';
import Service from './service/service';


(() => {
    /* Some predefined cities.
    *
    * */
    let cityArray = [
        "Moscow",
        "London",
        "Yerevan",
        "Berlin"
    ];
    let weatherData = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];

    let citiesList = new CitiesList(cityArray);
    let weatherList = new WeatherList(weatherData);
    let service = new Service();

    let construct = new ConstructPanel(citiesList, weatherList, service);
    /* Find current city by location.
    * */
    service.getLocation().then(location => {
        let data = JSON.parse(location);
        let location_;
        for (let r = 0; r < data.results.length; r++) {
            let result = data.results[r];

            if (result.types[0] === 'locality') {
                for (let c = 0; c < result.address_components.length; c++) {
                    let component = result.address_components[c];
                    if (component.types[0] === 'locality') {
                        location_ = component.long_name;
                        break;
                    }
                }
            }
        }
        /* Construct Cities combobox
        * */
        for(let i in cityArray) {
            construct.constructCitiesListHtml(cityArray[i], location_)
        }

        construct.getWeather(location_);
    });
}
)();