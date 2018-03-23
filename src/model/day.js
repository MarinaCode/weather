class Day {
    constructor(code, date, day, hight, low, text) {
        this.code = code;
        this.date = date;
        this.day = day;
        this.high = hight;
        this.low = low;
        this.text = text;

    }

    getDay() {
        let today = new Date();
        let dd = today.getDay();
        return dd;
}
}

export default Day;