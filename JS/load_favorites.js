import { AddListItem } from "./submit_forms.js"
import { SortLocalStorage } from "./localStorage.js"
window.addEventListener('load', function () {
    const SortedLocalStorage=SortLocalStorage()
    for (let index = 0; index < SortedLocalStorage.localStorageArray.length; index++) {
        let item=JSON.parse(SortedLocalStorage.localStorageArray[index])
        let user_item=JSON.parse(item.user)
        let current_userJson=JSON.parse(current_user)
        if(user_item.login===current_userJson.login&&user_item.password===current_userJson.password){
        AddListItem(JSON.parse(SortedLocalStorage.localStorageArray[index]).answer, true, SortedLocalStorage.numericKeys[index])
       }
    }
})