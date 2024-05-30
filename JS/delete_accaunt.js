import { SortLocalStorage } from "./localStorage.js";
import { Submit } from "./random_button.js";
delete_account_button.addEventListener("click", function () {
  const SortedLocalStorage = SortLocalStorage();
  for (let index = 0;index < SortedLocalStorage.localStorageArray.length;index++
  ) {
    const item = JSON.parse(SortedLocalStorage.localStorageArray[index]);
    if (item[index].user && item[index].user.login === current_user.login) {
      sessionStorage.removeItem(SortedLocalStorage.numericKeys[index]);
    }
  }
  Submit(logout_button);
});
