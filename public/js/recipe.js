/*Subir Imagen Funcion*/

const SubirImagenAxios = async event => {
    const token = localStorage.getItem('UserToken')
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    try {
        const {
            data: {
                msg,
                imagen: {
                    src
                }
            }
        } = await axios.post("/api/v1/recipe/image", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
            }
        })
        return src
    } catch (err) {
        console.log(err)
    }
}

const SubirImagenEvento = () => {
    const fileAddonDOM = document.getElementById("inputFile")
    const fileLabelDOM = document.getElementById("inputLabel")
    fileAddonDOM.addEventListener('change', async event => {
        let src = await SubirImagenAxios(event)
        localStorage.setItem("imagen", src)
        src = src.split('/')
        fileLabelDOM.innerHTML = src[7]
    })
}

/*Subir Imagen Funcion*/

/*Subir Receta Final Funcion */

const SubirReceta = async () => {
    const nameDOM = document.getElementById("nametxt").value
    const ingredientsDOM = document.getElementById("ingredientstxt").value
    const stepsDOM = document.getElementById("stepstxt").value
    const levelRangeDOM = document.getElementById("levelrange").value
    const imageDOM = localStorage.getItem("imagen")
    const userLS = localStorage.getItem("UserID")
    const token = localStorage.getItem("UserToken")
    const ingredients = ingredientsDOM.split(',')
    const recipe = {
        name: nameDOM,
        ingredients: ingredients,
        chef: userLS,
        steps: stepsDOM,
        level: levelRangeDOM
    }
    if(!userLS){
        throw new Error("Debe iniciar sesion para poder subir la receta")
    }
    if(imageDOM.startsWith("https")){
        recipe.image = imageDOM
    }
    const{data} = await axios.post("/api/v1/recipe", recipe, {
        headers: {
            "Authorization": token
        }
    })
    console.log(data)
    return data.msg
}

const SubirRecetaEvento = () => {
    const submitBtnDOM = document.getElementById("submitForm")
    submitBtnDOM.addEventListener("click", async () => {
        let msg = await SubirReceta()
        if(msg.startsWith('receta')){
            location.assign('index.html')
        }
    })
}

/*Subir Receta Final Funcion */

/* MAIN CALLS */

SubirImagenEvento()
SubirRecetaEvento()

/* MAIN CALLS */