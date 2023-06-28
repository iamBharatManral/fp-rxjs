import {fromEvent, interval, map, takeUntil} from "rxjs";

const startBtn = document.querySelector(".start")
const stopBtn = document.querySelector(".stop")
const resultsArea: HTMLElement = document.querySelector(".time")

const startClick$ = fromEvent(startBtn, "click")
const stopClick$ = fromEvent(stopBtn, "click")
let tenthSecond$ = interval(100)


startClick$.subscribe(() => {
    tenthSecond$.pipe(map(num => num / 10), takeUntil(stopClick$)).subscribe(num => resultsArea.innerText = num + 's')
})

