import {flatMap, from, fromEvent, map, mergeMap, reduce, tap} from "rxjs";

function pigLatinfy(word: string): string{
    return word.length < 2 ? word : `${word.slice(1)}-${word[0].toLowerCase()}ay`
}

const textBox: HTMLInputElement = document.querySelector("input")
const pigLatinElm: HTMLElement = document.querySelector(".pig")

const keyUp$ = fromEvent(textBox, "keyup")

keyUp$.pipe(
    map((event: InputEvent) => ((event.target) as HTMLInputElement).value),
    mergeMap(wordString =>
        from(wordString.split(/\s+/)).pipe(
        map(pigLatinfy),
            reduce((bigString, newWord) => `${bigString} ${newWord}`, "")
    )),

).subscribe(translated => {
    pigLatinElm.innerText = translated
})