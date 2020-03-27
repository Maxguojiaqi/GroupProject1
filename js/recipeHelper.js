
let mainContent = document.getElementById('mainContent');



document.getElementById('searchBtn').addEventListener('click',function()
{
    let ingredientsNode = document.getElementById("ingredients");
    let caloriesNode = document.getElementById("calories");
    let cookTimeNode = document.getElementById("cookTime");
    let dietTypeeNode = document.getElementById("dietType");
    let mealTypeNode = document.getElementById("mealType");

    let ingredientsVal = ingredientsNode.value
    let caloriesVal = caloriesNode.value
    let cookTimeVal = cookTimeNode.value
    let dietTypeVal = dietTypeeNode.options[dietTypeeNode.selectedIndex].value;
    let mealTypeVal = mealTypeNode.options[mealTypeNode.selectedIndex].value;

    dishInfoArray = [ingredientsVal,caloriesVal,cookTimeVal,dietTypeVal,mealTypeVal]

    function checkNullVal(val){
        return val === ''
    }

    if (dishInfoArray.some(checkNullVal))
    {
        $('.ui.basic.modal')
        .modal('show');  
    }

    else
    {
        let URL = `https://api.edamam.com/search?q=${ingredientsVal}&app_id=9f876c04&app_key=190b06b9613e95cc66922c0f29cf9429&from=0&to=3&time=${cookTimeVal}&diet=${dietTypeVal}&calories=${caloriesVal}&meal=${mealTypeVal}`                     
        
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
    }

})


function domFetchVideo(el){

    let searchKeyWord = el.target.getAttribute('data-value')
    fetch(`https://videosearch.cognitiveservices.azure.com/bing/v7.0/videos/search?q=${searchKeyWord}&count=1&offset=0&mkt=en-us&safeSearch=Moderate`, {
        headers: {
            "Ocp-Apim-Subscription-Key":"735862a6625b4c65a7fd0c551d621543"
        }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            let newDocument = new DOMParser().parseFromString(data.value[0].embedHtml, 'text/html')
            let urlSource = newDocument.getElementsByTagName('iframe')[0].src
            console.log(urlSource)

            let videoIframeHTML = `<iframe id="videoContent" width ="1000" height="600" src='${urlSource}' class="column"></iframe>`
            document.getElementById('videoContentParent').innerHTML += videoIframeHTML
            
            document.getElementById("videoContentParent").scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest"
                });
        })
        .catch((error) => {
        console.error('Error:', error);
        });



}

function domRestruct(recipeList){

    mainContent.innerHTML = '';
    console.log(recipeList);
    recipeList.forEach(element => {
        let dishContent = document.createElement('div');
        dishContent.setAttribute('class','center aligned column')
        dishContent.setAttribute('style','background-color: rgba(255, 255, 255, 0.68); border: double; height:550px')
        let dishName = document.createElement('h4')
        dishName.innerText = element.mealName
        dishContent.appendChild(dishName);
        let dishImage = document.createElement('img')
        dishImage.setAttribute('src',element.mealImageURL)
        dishContent.appendChild(dishImage);
        let dishIngredients = document.createElement('ul')
        dishIngredients.setAttribute('style','height:20%; overflow-y:scroll;')
        dishContent.appendChild(dishIngredients)
        element.mealFullIngredients.forEach(Ingredient => {
            let ingredientItem = document.createElement('li')
            ingredientItem.innerText = Ingredient
            dishIngredients.appendChild(ingredientItem);
        });
        let selectButton = document.createElement("button");
        selectButton.innerText = "Select";
        selectButton.setAttribute('class','ui primary button');
        selectButton.setAttribute('data-value',element.mealName)
        dishContent.appendChild(selectButton)
        mainContent.appendChild(dishContent) 

        selectButton.addEventListener('click', function(e){
            console.log(e.target)

            // clean up the video parent div before
            let videoParent = document.getElementById("videoContentParent");
            videoParent.innerHTML =''

            domFetchVideo(e);

        });
    });

}
