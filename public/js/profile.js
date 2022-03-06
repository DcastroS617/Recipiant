

const ShowUserRecipes = () => {
    const UserID = localStorage.getItem("UserID")
    let UserName = localStorage.getItem("UserEmail")
    let template
    UserName = UserName.split('@')[0]
    console.log(UserName)
    $.get(`/api/v1/recipe?chef=${UserID}`, (recipe) => {
        if(recipe.msg.startsWith('resultado')){
            recipe.recipe.forEach(item => {
                let ingredientsFinal = item.ingredients.join(", ")
                template += `
                <div class="col-lg-6 col-md-6 col-sm-12 mt-2">
                <div class="card h-100">
                    <img class="card-img-top img_style" src="${item.image}" alt="imagen de ${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <h6 class="card-subtitle">chef: ${UserName}</h6>
                            <button class="btn btn-outline-success mt-2 editRecipe" type="button">Editar Receta</button>
                            <div>
                                <form class="form">
                                    <div class="input-group editContent">
                                        <label>Chef</label>
                                        <input type="text" class="form-input"></input>
                                    </div>
                                </form>
                            </div>
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
            $("#yourecipe").html(template)
            });
        }
    })
}

const displayEdit = () => {
    const editRecipe = document.querySelector(".editRecipe")
    const editContent = document.querySelector(".editContent")
    editContent.hidden = true
    for (let i = 0; i < editRecipe.length; i++) {
        editRecipe[i].addEventListener("click", () => {
            //add event to toggle a collapsible containing a form which has the attr to edt a recipe
        })
        
    }
}

const EditRecipe = async (item) => {
    const UserID = localStorage.getItem("UserID")
    const UserToken = localStorage.getItem("UserToken")
    const itemFinal = {
        ingredients : item.ingredients,
        level : item.level,
        name : item.name,
        chef : UserID,
        steps : item.steps,
    }
    const {data} = await axios.put("/api/v1/recipe/" + item._id, itemFinal, {
        Headers: {
            "Authentication": UserToken,
            "Content-Type": "application/json"
        }
    })
    return data
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

ShowUserRecipes()
displayEdit()