import { AddListItem } from "./submit_forms.js"
import { SortLocalStorage } from "./localStorage.js"
window.addEventListener('load', function () {
    const SortedLocalStorage=SortLocalStorage()
    for (let index = 0; index < SortedLocalStorage.localStorageArray.length; index++) {
        AddListItem(SortedLocalStorage.localStorageArray[index], true, SortedLocalStorage.numericKeys[index])
    }
})