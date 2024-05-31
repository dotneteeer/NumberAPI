let keysToRemove=[]
delete_account_button.addEventListener("click", function () {
  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index)
    const item=JSON.parse(localStorage.getItem(key))
    if (item.user && item.user.login === current_user.login) {
      keysToRemove.push(key)
    }
    if (item.login && item.login === current_user.login) {
      keysToRemove.push(key)
    }
  }
  keysToRemove.forEach((key)=>{
    localStorage.removeItem(key)
  })
  var clickEvent = new MouseEvent("click", { "view": window, "bubbles": true, "cancelable": false });
  logout_button.dispatchEvent(clickEvent)
});
