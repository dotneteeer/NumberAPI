username_strong.textContent=current_user.login

logout_button.addEventListener('click', function(){
    sessionStorage.removeItem("CURRENT_USER")
    current_user=null;
    window.location.replace("registartion.html")
})
