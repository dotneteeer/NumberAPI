random_number.addEventListener('click', function(){
    const number=Math.floor(Math.random() * 1001)
    number_input.value=number;
    SubmitForm(number_form)
})

random_date.addEventListener('click', function(){
    const day=Math.floor(Math.random() * 32)
    const month=Math.floor(Math.random() * 13)
    day_input.value=day
    month_input.value=month
    SubmitForm(date_form)
})

function SubmitForm(form){
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(submitEvent);
}