import {ajax} from "rxjs/internal/ajax/ajax";
import {delay, map, merge, scan} from "rxjs";

const requests = []

const canvas = document.querySelector("canvas")
const progressBar: HTMLElement = document.querySelector(".progress")
const ctx = canvas.getContext("2d")
canvas.width = 450
canvas.height = 540


let coords = {x: 45, y: 54};

for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
        const endpoint = `http://localhost:8080/assets/coverpart-${x}-${y}.png`
        const request$ = ajax({
            url: endpoint,
            responseType: "blob"
        }).pipe(
            map(res => ({
                blob: res.response,
                x,
                y
            }))
        )
        requests.push(request$)
    }
}

// @ts-ignore
function drawToPage(config) {
    let img = new Image();
    img.onload = function () {
        ctx.drawImage(img, config.x * coords.x, config.y * coords.y, coords.x, coords.y);
    }
    img.src = URL.createObjectURL(config.blob);
}

merge(...requests).pipe(
    delay(1000)
).subscribe(
    {
        next: val => drawToPage(val),
        error: err => alert(err)
    }
)

merge(...requests).pipe(
    delay(1000),
    scan(prev => prev + (100 / requests.length), 0)
).subscribe(percentDone => {
    progressBar.style.width = `${percentDone * 4.5}px`
    progressBar.style.backgroundColor = "gold"
    progressBar.innerText = Math.round(percentDone) + "%"
})