import { handleSubmit } from "./submit_forms.js"
number_form.addEventListener('submit',  function(e){
    e.preventDefault()
    handleSubmit()
    number_input.value=''
    number_input.blur()
})
date_form.addEventListener('submit', function(e){
    e.preventDefault()
    handleSubmit()
    day_input.value=''
    month_input.value=''
    day_input.blur()
    month_input.blur()
})
