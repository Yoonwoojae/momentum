const clockContainer = document.querySelector(".js-clock");
const clockTitle = document.querySelector(".js-title");

function getTime() {
    setInterval(() => {
        timeSet();
    }, 1000);
}

function timeSet() {
    const date = new Date();
    const hour = convertTime(date.getHours());
    const minute = convertTime(date.getMinutes());
    const second = convertTime(date.getSeconds());
    clockTitle.innerHTML = `${hour} : ${minute} : ${second}`;
}

function convertTime(time) {
    return time < 10? `0${time}`: time;
}

function init() {
    timeSet();
    getTime();
}

init();