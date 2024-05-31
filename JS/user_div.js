username_strong.textContent=current_user.login

logout_button.addEventListener('click', function(){
    sessionStorage.clear()
    current_user=null;
    window.location.replace("registartion.html")
})
