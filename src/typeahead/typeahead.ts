import {filter, from, fromEvent, map, mergeMap, pluck, reduce, tap} from "rxjs";

const usStates = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
const textBox : HTMLInputElement = document.querySelector(".typeAheadBox")
const typeAheadText : HTMLInputElement = document.querySelector(".typeAheadContainer")

const keyUp$ = fromEvent(textBox, 'keyup')

keyUp$.pipe(
    map(event => (event?.target as HTMLInputElement)?.value.toLowerCase()),
    tap(() => typeAheadText.innerHTML = ""),
    filter(val => val.length >= 2),
    mergeMap(val =>
        from(usStates).pipe(
            map(state => state.toLowerCase()),
            filter(state => state.includes(val)),
            map(state => state.split(val).join(`<b>${val}</b>`)),
            reduce((prev, state) => prev.concat(state), [])
        )
    )
).subscribe(stateList => {
    typeAheadText.innerHTML += `<br>${stateList.join('<br>')}`
})