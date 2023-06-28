import {fromEvent, map} from "rxjs";

function pigLatinfy(word: string): string{
    return word.length < 2 ? word : `${word.slice(1)}-${word[0].toLowerCase()}ay`
}

const textBox: HTMLInputElement = document.querySelector("input")
const pigLatinElm: HTMLElement = document.querySelector(".pig")

const keyUp$ = fromEvent(textBox, "keyup")

keyUp$.pipe(
    map((event: InputEvent) => ((event.target) as HTMLInputElement).value),
    map(wordString => wordString.split(/\s+/)),
    map(wordArray => wordArray.map(pigLatinfy))
).subscribe(translated => {
    pigLatinElm.innerText = translated.join(" ")
})