
const showRecipes = () => {
    try {
        let template = ""
        const mainview = document.getElementById('mainview')
        const resultview = document.getElementById('resultview')
        mainview.hidden = false
        resultview.hidden = true
        $.get('/api/v1/recipe/', function (recipes) {
            recipes.recipe.forEach((item) => {
                $.get('/api/v1/user/' + item.chef, function (chef) {
                    let chefName = chef.userFound.name
                    let ingredientsFinal = item.ingredients.join(', ')
                    template +=
                        `
                    <div class="col-lg-6 col-md-6 col-sm-12 mt-2">
                        <div class="card h-100">
                            <img class="card-img-top img_style" src="${item.image}" alt="imagen de ${item.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${item.name}</h5>
                                    <h6 class="card-subtitle">chef: ${chefName}</h6> ` + 
                                    '<button onclick="likeButton(\''+item._id+'\')" class="btn btn-outline-success mt-2">&#x2764;</button>' + 
                                    '<button onclick="dislikeButton(\''+item._id+'\')" class="btn btn-outline-danger mt-2 ml-2" type="button">&#x2716;</button>' + `
                                    <button class="btn btn-outline-info mt-2">Compartir</button>
                                    <button type="button" onclick="toggleRecipeData()" class="btn btn-dark mt-2 collapsible">Ver Detalles</button>
                                    <div class="content">
                                        <div class="card card-body">
                                        <h5 class="card-title">Ingredientes</h5>
                                            ${ingredientsFinal}
                                        </div>
                                        <div class="card card-body">
                                        <h5 class="card-title">Pasos</h5>
                                            ${item.steps}
                                        </div>
                                    </div>
                                </div>
                        </div>                
                    </div>`
                    $("#recipe").html(template)
                })
            })
        })
    } catch (error) {
        console.log(error)
    }
}
//onclick="likeButton(\''+item._id+'\')
const showRecipeResult = () => {
    const searchDOM = $('#searchtxt').val()
    const mainview = document.getElementById('mainview')
    const resultview = document.getElementById('resultview')
    mainview.hidden = true
    resultview.hidden = false
    let template = ''
    console.log(searchDOM);
    $.get('/api/v1/recipe?name=' + searchDOM, function (result) {
        result.recipe.forEach(item => {
            $.get('/api/v1/user/' + item.chef, function (chef) {
                let chefName = chef.userFound.name
                let ingredientsFinal = item.ingredients.join(', ')
                template +=
                `
                <div class="col-lg-6 col-md-6 col-sm-12 mt-2">
                <div class="card h-100">
                    <img class="card-img-top img_style" src="${item.image}" alt="imagen de ${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <h6 class="card-subtitle">chef: ${chefName}</h6>
                            <button class="btn btn-outline-success mt-2" type="button" onclick="likeButton(${item._id})">&#x2764;</button>
                            <button class="btn btn-outline-danger mt-2" type="button">&#x2716;</button>
                            <button class="btn btn-outline-info mt-2">Compartir</button>
                            <button type="button" onclick="toggleRecipeData()" class="btn btn-dark mt-2 collapsible">Ver Detalles</button>
                            <div class="content">
                                <div class="card card-body">
                                <h5 class="card-title">Ingredientes</h5>
                                    ${ingredientsFinal}
                                </div>
                                <div class="card card-body">
                                <h5 class="card-title">Pasos</h5>
                                    ${item.steps}
                                </div>
                            </div>
                        </div>
                </div>               
            </div>`
                $("#recipeResult").html(template)
            })
        })
    })
}

const searchEvent = () => {
    const btn = document.getElementById("searchbtn")
    btn.addEventListener('click', showRecipeResult)
}

const toggleRecipeData = () => {
    var coll = document.getElementsByClassName("collapsible");
    var i;
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
          this.classList.toggle("Active");
          var content = this.nextElementSibling;
          if (content.style.maxHeight){
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
          } 
        });
    }
}

const likeButton = async (recipeID) =>{
    const UserID = localStorage.getItem('UserID')
    const token = localStorage.getItem("UserToken")
    const item = {
        user: UserID,
        recipe: recipeID,
        like: true,
        dislike: false
    }
    const {data} = await axios.post("/api/v1/favorites", item, {
        headers: {
            "Authorization": token
        }
    })
    console.log(data)
}

const dislikeButton = async (recipeID) => {
    const UserID = localStorage.getItem("UserID")
    const token = localStorage.getItem("UserToken")
    const item = {
        user: UserID,
        recipe: recipeID,
        like: false,
        dislike: true
    }
    const{data} = await axios.post("/api/v1/favorites", item, {
        headers: {
            "Authorization": token
        }
    })
    console.log(data)
}

/* MAIN */
showRecipes()
searchEvent()
/********/