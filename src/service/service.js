/*
* This service provides current location and weather by city
* Using Api: yahooapis  - for weather forecast
*            googleapis - for current location
* */
class Service {

    getWeather(city) {
        return new Promise((resolve, reject) => {
            let url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D"${city}")%20and%20u=%27c%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
            let xhReq = new XMLHttpRequest();
            xhReq.open("GET", `${url}`);
            xhReq.onload = () => {
                if (xhReq.status >= 200 && xhReq.status < 300) {
                    resolve(xhReq.response);
                } else {
                    reject(xhReq.statusText);
                }
            };
            xhReq.onerror = () => reject(xhReq.statusText);
            xhReq.send(null);
        })
    }




    getLocation() {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                // Fetch Coordinates
                navigator.geolocation.getCurrentPosition((position) => {
                    let latitude = position.coords.latitude;
                    let longitude = position.coords.longitude;
                    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDO-3mBUegnjGsTEoyDNX3qpoBLsv8WW8o`;
                    let xhReq = new XMLHttpRequest();
                    xhReq.open("GET", `${url}`);
                    xhReq.onload = () => {
                        if (xhReq.status >= 200 && xhReq.status < 300) {
                            resolve(xhReq.response);
                        } else {
                            reject(xhReq.statusText);
                        }
                    };
                    xhReq.onerror = () => reject(xhReq.statusText);
                    xhReq.send(null);

                });
            }
        });
    }

}
export default Service;

