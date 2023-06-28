import {fromEvent, map, takeUntil} from "rxjs";

const draggable = <HTMLElement> document.querySelector(".drag")

const mouseDown$ = fromEvent(draggable, "mousedown")
const mouseUp$ = fromEvent(draggable, "mouseup")
const mouseMove$ = fromEvent(draggable, "mousemove")

mouseDown$.subscribe(() => {
    mouseMove$.pipe(map((event: MouseEvent) => {
        event.preventDefault()
        return {
            x: event.clientX,
            y: event.clientY
        }
    }), takeUntil(mouseUp$)).subscribe(pos => {
        draggable.style.position = "absolute"
        draggable.style.left = `${pos.x}px`
        draggable.style.top = `${pos.y}px`
    })
})