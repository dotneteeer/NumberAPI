toogle_form_button.addEventListener('click', function(){
    number_form.classList.toggle('hidden')
    date_form.classList.toggle('hidden')

    current_inputs=current_form==='date'?[month_input, day_input]:[number_input]
    current_form=current_form==='date'?'number':'date'

    toogle_form_button.textContent=current_form==='date'?'Show number from':'Show date form'
})
