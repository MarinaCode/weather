import Utils from '../utils/utils';

class ConstructPanel {
    constructor(citiesList, weatherList, service) {
        this.citiesListPanel = document.getElementById('select-city');
        this.weatherListPanel = document.getElementById('weather-list-ul');
        this.weatherListPanel.addEventListener('click', this.getDetail.bind(this));
        this.citiesListPanel.addEventListener('change', this.chooseCity.bind(this));
        this.citiesList = citiesList;
        this.weatherList = weatherList;
        this.service = service;
    }

    /**
     * Get Weather by City
     */


    getWeather(selectedCity) {
        this.service.getWeather(selectedCity).then(data => {
            let weatherResult = JSON.parse(data);
            this.location = selectedCity;
            weatherResult = weatherResult.query.results.channel.item.forecast;
            weatherResult = Utils.sliceArray(0,7,weatherResult);
            this.weatherListPanel.innerHTML = '';
            for(let i in weatherResult) {
                this.constructWeatherListHtml(weatherResult[i])
            }
        });
    }

    /* Choose city and load weather list
    *
    * */

    chooseCity(e) {
       let selectedCity = e.target.value;
       this.getWeather(selectedCity);
    }

    /* Get weather detail
    *
    * */

    getDetail(e) {
        if (e.target.className.indexOf("date") >= 0) {
            let check = document.getElementsByClassName('weather-detail');
            for (let i = 0; i < check.length; i++) {
                let checkcClass = check[i].classList;
                if (checkcClass[1] != 'hide') {
                    checkcClass.add('hide');
                }
            }
            if (document.getElementsByClassName('active')[0]) {
                document.getElementsByClassName('active')[0].classList.remove('active');
            }

            e.target.children[0].classList.remove('hide');
            e.target.classList.add('active');
        }
    }

    constructCitiesListHtml(cityName, location) {
        let selected = cityName == location ? 'selected' : '';
        return this.citiesListPanel.innerHTML +=
            ` <option value=${cityName.toLocaleLowerCase()} ${selected}>${cityName}</option>`;
    }

    /*
    * Construct Weather list and choose current date
    * */

    constructWeatherListHtml(days) {
        let now = new Date();
        let day = days.day;
        let date = days.date;
        let newDate = new Date(date);
        let high = days.high;
        let low = days.low;
        let text = days.text;
        let addClassActive = newDate.getDay() == now.getDay() ?  'active' : '';
        let hide =  newDate.getDay() != now.getDay() ?  'hide' : '';
        return this.weatherListPanel.innerHTML +=
            `<li class="date ${addClassActive}" day=${day} >${date}
                <span class="weather-detail ${hide}">
                    <label> ${text}</label>
                    <label> Hi ${high} &#176;</label>
                    <label> Low ${low} &#176;</label>
                </span>
            </li>
                `;
    }
}

export  default ConstructPanel;