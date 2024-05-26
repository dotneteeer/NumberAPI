import { SubmitUserAuthorization } from "./handle_authorization.js";

password_input.addEventListener('keypress', function(event){
  if(event.keyCode===13){
    SubmitUserAuthorization()
  }
})
password_input.addEventListener('input', function(){
  password_input.placeholder="Your password"
  password_input.style.borderColor="#22272d"
})
username_input.addEventListener('keypress', function(event){
  if (event.keyCode === 13) {
    username_input.blur()
    password_input.focus()
  }
})
authorize_submit_button.addEventListener('click', function(event){
  password_input.blur()
  username_input.blur()
  SubmitUserAuthorization()
})