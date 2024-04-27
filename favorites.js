export function ChangeFavorite(buttonElement, value, id){
    if(!buttonElement.classList.contains('focused')){
        localStorage.setItem(id, value)
    }
    else{
        localStorage.removeItem(id)
    }

}

