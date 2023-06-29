import {filter, from, fromEvent, map, mergeMap, pluck, reduce, tap} from "rxjs";

const states = [ "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"]

const textBox : HTMLInputElement = document.querySelector(".typeAheadBox")
const typeAheadText : HTMLInputElement = document.querySelector(".typeAheadContainer")

const keyUp$ = fromEvent(textBox, 'keyup')

keyUp$.pipe(
    map(event => (event?.target as HTMLInputElement)?.value.toLowerCase()),
    tap(() => typeAheadText.innerHTML = ""),
    filter(val => val.length >= 2),
    mergeMap(val =>
        from(states).pipe(
            map(state => state.toLowerCase()),
            filter(state => state.includes(val)),
            map(state => state.split(val).join(`<b>${val}</b>`)),
            reduce((prev, state) => prev.concat(state), [])
        )
    )
).subscribe(stateList => {
    typeAheadText.innerHTML += `<br>${stateList.join('<br>')}`
})