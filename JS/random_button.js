random_number.addEventListener('click', function(){
    const number=Math.floor(Math.random() * 1001)
    number_input.value=number;
    Submit(number_form)
})

random_date.addEventListener('click', function(){
    const day=Math.floor(Math.random() * 32)
    const month=Math.floor(Math.random() * 13)
    day_input.value=day
    month_input.value=month
    Submit(date_form)
})

export function Submit(element){
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    element.dispatchEvent(submitEvent);
}