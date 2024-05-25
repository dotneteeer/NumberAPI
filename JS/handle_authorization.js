import { CreateUser } from "./Authorize_user.js";
export function SubmitUserAuthorization() {
  if (!username_input.value || !password_input.value) {
    alert("Password and login can not be empty");
    return;
  }
  CreateUser(username_input.value, password_input.value)
  window.location.replace("index.html")
}
