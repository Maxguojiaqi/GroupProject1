
let mainContent = document.getElementById('mainContent');



document.getElementById('searchBtn').addEventListener('click',function()
{
    let ingredientsNode = document.getElementById("ingredients");
    let caloriesNode = document.getElementById("calories");
    let cookTimeNode = document.getElementById("cookTime");
    let dietTypeeNode = document.getElementById("dietType");
    let cusineTypeNode = document.getElementById("cusineType");
    let mealTypeNode = document.getElementById("mealType");
    let dishTypeNode = document.getElementById("dishType");


    let ingredientsVal = ingredientsNode.value
    let caloriesVal = caloriesNode.value
    let cookTimeVal = cookTimeNode.value
    let dietTypeVal = dietTypeeNode.options[dietTypeeNode.selectedIndex].value;
    let cusineTypeVal = cusineTypeNode.options[cusineTypeNode.selectedIndex].value;
    let mealTypeVal = mealTypeNode.options[mealTypeNode.selectedIndex].value;
    let dishTypeVal = dishTypeNode.options[dishTypeNode.selectedIndex].value;

    let URL = `https://api.edamam.com/search?q=${ingredientsVal}&app_id=1ffa7877&app_key=210e1a7abe5f717b7fb3420dc46866d9&from=0&to=3&time=${cookTimeVal}&diet=${dietTypeVal}&calories=${caloriesVal}&cusine=${cusineTypeVal}&meal=${mealTypeVal}&dish=${dishTypeVal}`                     
    
    fetch(URL)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            let recipeList = []
            data.hits.forEach(element => {
                let mealObj = {
                    mealName : element.recipe.label,
                    mealImageURL : element.recipe.image,
                    mealFullIngredients : element.recipe.ingredientLines
                }
                recipeList.push(mealObj)
            });
            domRestruct(recipeList)

        }).catch(error=>{
            console.log(error);
        });

})


function domRestruct(recipeList){

    mainContent.innerHTML = '';
    // let dishContent = document.createElement('div');
    console.log(recipeList);
    recipeList.forEach(element => {
        let dishContent = document.createElement('div');
        dishContent.setAttribute('class','center aligned column')
        dishContent.setAttribute('style','background-color: rgba(255, 255, 255, 0.68);')
        let dishName = document.createElement('h4')
        dishName.innerText = element.mealName
        dishContent.appendChild(dishName);
        let dishImage = document.createElement('img')
        dishImage.setAttribute('src',element.mealImageURL)
        dishContent.appendChild(dishImage);
        let dishIngredients = document.createElement('ul')
        dishContent.appendChild(dishIngredients)
        element.mealFullIngredients.forEach(Ingredient => {
            let ingredientItem = document.createElement('li')
            ingredientItem.innerText = Ingredient
            dishIngredients.appendChild(ingredientItem);
        });
        let selectButton = document.createElement("BUTTON");
        let text = document.createTextNode("Select");
        selectButton.appendChild(text);
        dishContent.appendChild(selectButton)
        mainContent.appendChild(dishContent)
    });

}