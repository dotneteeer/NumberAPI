import { CreateUser, hash } from "./Authorize_user.js";
import { GetUsersFromLocalStorage } from "./localStorage.js";
export async function SubmitUserAuthorization() {
  if (!username_input.value || !password_input.value) {
    alert("Password and login can not be empty");
    return;
  }

  const localStorageArray=GetUsersFromLocalStorage();
  
  for (const item of localStorageArray) {
    const itemJson=JSON.parse(item)
    const hashed_password=await hash(password_input.value)
    if(itemJson.login===username_input.value&&itemJson.password!==hashed_password){
      password_input.placeholder="Incorrect password"
      password_input.style.borderColor='#cc0000'
      password_input.value=''
      return;
    }
  }

  CreateUser(username_input.value, password_input.value);
  window.location.replace("index.html");
  
}
