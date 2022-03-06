let correoElectronicoDOM = document.getElementById('email')
let contrasenaDOM = document.getElementById('password')
let errorDOM = document.querySelector('.error')
let errorBlockDOM = document.querySelector('.errorBlock')

const backIndex = () => {
    window.location = "index.html"
}

/*login function*/

const login = () => {
    try {
        const email = correoElectronicoDOM.value
        const pass = contrasenaDOM.value
        const item = {
            email: email,
            password: pass
        }
        fetch('/api/v1/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    HandleError(data)
                }
                if (data.msg.startsWith("hey")) {
                    SetToken(data)
                }
            })
            .catch(error => {
                console.error(error)
            })
    } catch (error) {
        console.log(error)
    }
}

const SetToken = (data) => {
    data.token = 'Bearer ' + data.token
    localStorage.setItem('UserToken', data.token)
    localStorage.setItem('UserID', data.userID)
    localStorage.setItem('UserEmail', data.userEmail)
    location.assign('index.html')
    errorDOM.hidden = true;
}

const HandleError = (data) => {
    errorBlockDOM.hidden = false
    errorDOM.innerHTML = data.error
}

/*login function*/

