import { handleSubmit } from "./submit_forms.js"
number_form.addEventListener('submit',  function(e){
    e.preventDefault()
    handleSubmit()
})
date_form.addEventListener('submit', function(e){
    e.preventDefault()
    handleSubmit()
})
