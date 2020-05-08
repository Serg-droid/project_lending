function makeTimer(deadline) {
    const   timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

    let   endTime = new Date(deadline).getTime();

    function setTimeForTimer() {
        const   startTime = new Date().getTime(),
                periodTime = endTime - startTime;

        const   seconds = String(Math.floor(periodTime / 1000) % 60),
                minutes = String(Math.floor(periodTime / 1000 / 60) % 60),
                hours = String(Math.floor(periodTime / 1000 / 3600));
        
        if (periodTime < 0) {
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
            const distDay = new Date(startTime - endTime).getDate();
            endTime = endTime + (24 * 3600 * 1000) * (distDay - 1);
            return;
        }

        timerHours.textContent = hours.length === 2 ? hours : `0${hours}`;
        timerMinutes.textContent = minutes.length === 2 ? minutes : `0${minutes}`;
        timerSeconds.textContent = seconds.length === 2 ? seconds : `0${seconds}`;
    }

    const idInterval = setInterval(setTimeForTimer, 1000);
}

export default makeTimer;