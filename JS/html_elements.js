const number_form=document.querySelector("#number_form"),
date_form=document.querySelector("#date_form"),
number_input=document.querySelector("#number_input"),
month_input=document.querySelector("#month_input"),
day_input=document.querySelector("#day_input"),
toogle_form_button=document.querySelector("#toogle_form_button"),
output_ul=document.querySelector("#output_ul"),
random_number=document.querySelector("#random_number"),
random_date=document.querySelector("#random_date"),
show_deleted_input=document.querySelector("#switch")


let current_form='number'
let is_deleted_shown=show_deleted_input.checked;