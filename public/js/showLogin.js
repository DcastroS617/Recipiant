//FUNCION QUE VALIDA EL INICIO SESION DE UN USUARIO
const showLogin = () => {
    const logDOM = document.getElementById('log')
    const logoutDOM = document.getElementById('logout')
    const localUser = localStorage.getItem('UserEmail')
    if (localUser) {
        let user = localUser.split("@")[0] //tomar el primer item del email (split)
        logDOM.innerHTML = user
        logDOM.href = "profile.html"
        logoutDOM.hidden = false
        $("#logout > a").html("cerrar sesión")
    } else {
        logDOM.innerHTML = "iniciar sesión"
        logDOM.href = "login.html"
        logoutDOM.hidden = true
    }
}

/*logout function*/

const logout = () => {
    document.querySelector('#logout > a').addEventListener('click', () => {
    localStorage.setItem('UserToken', '')
    localStorage.setItem('UserID', '')
    localStorage.setItem('UserEmail', '')
    location.assign('index.html')
    })
}

/*logout function*/

/* MAIN */
showLogin()
logout()
/* MAIN */