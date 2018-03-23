class Utils {
    static getDay() {
        let today = new Date();
        let weekday=["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];
        return weekday[today.getDay()];
    }
    static  sliceArray(atart, end, arr) {
        return  arr.slice(0,7);
    }
}

export default Utils;