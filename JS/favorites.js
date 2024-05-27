import { EncryptDecrypt } from "./encryption.js"
export function ChangeFavorite(buttonElement, value, id){
    if(!buttonElement.classList.contains('focused')){
        const encryptedAnswer=EncryptDecrypt(value.answer)
        value.answer=encryptedAnswer
        localStorage.setItem(id, JSON.stringify(value))
    }
    else{
        localStorage.removeItem(id)
    }

}

