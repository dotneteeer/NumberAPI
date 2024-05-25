import { SubmitUserAuthorization } from "./handle_authorization.js";

password_input.addEventListener('keypress', function(event){
  if(event.keyCode===13){
    SubmitUserAuthorization()
  }
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