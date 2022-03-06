
const getUserLikes = () => {
    const userID = localStorage.getItem('UserID')
    const token = localStorage.getItem('UserToken')
    console.log(userID)
    console.log(token)
    fetch('/api/v1/favorites', {
        headers: {
            'Authorization': token
        }
    })
    .then((response) => response.json())
    .then(data => console.log(data))
    .catch(err => console.error(err))
}

document.querySelector('.btnTest').addEventListener('click', getUserLikes)