// Create a searchQuery object
let searchQuery = {};

// Edamam parameters
const edamamGetMinRecipeNum = 0;
const edamamGetMaxRecipeNum = 24;
const edamamRecipesPerPage = 3;
let edamamMinIngredientRecipeNum = 0;
let edamamMaxIngredientRecipeNum = edamamRecipesPerPage;

// Store the entire data for each meal from Edamam server here
let edamamIngredientData;

// Set default min and max calories
const defaultMinCalories = 10;
const defaultMaxCalories = 10000;

function searchAgainButtonClick() {
	$('#search-again-button').click(function(event) {
		$('#search-again-button').hide();
		$('.search-container').slideDown("slow");		
	});
}

function clearSearchFieldsClick() {
	$('#clear-search-fields').click(function(event) {
		clearAllFormFields();
	});
}

function edamamThumbnailClick() {
	$('#js-edamam-ingredient-results').on('click', '.thumbnail', function(event) {
		let url = $(this).data('recipeurl');
		if((url) && (url.length > 0)) {
			window.open(url);
		}
	});
}

function edamamThumbnailKeyup() {
	$('#js-edamam-ingredient-results').on('keyup', '.thumbnail', function(event) {
		if (event.keyCode === 13) {
			let url = $(this).data('recipeurl');
			if((url) && (url.length > 0)) {
				window.open(url);
			}
		}
	});
}

function clearAllFormFields() {
	$("input").val("");
	$("select").val("");
	$("#calories-min").val(defaultMinCalories);
	$("#calories-max").val(defaultMaxCalories);
}

function getEdamamRecipes(searchQuery, callback, meal) {	
	const settings = {
		url: SEARCH_URL.EDAMAM,
		data: {
			q: searchQuery.query,
			calories: searchQuery.calories,
			ingr: searchQuery.ingr,
			diet: searchQuery.diet,
			from: edamamGetMinRecipeNum,
			to: edamamGetMaxRecipeNum,
			app_id: API_ID.EDAMAM,
			app_key: API_KEY.EDAMAM
		},
		dataType: 'json',
		type: 'GET',
		success: callback,
		error: function (printError) {
			// TODO: print an error to the user
			alert("EDAMAM SERVER ERROR! Can't display " + meal + " results. Sorry you've reached the limit of your program. Please wait a few minutes and try again.");
			console.log("Error: " + printError);
		},
	};
	$.ajax(settings);
}

function renderEdamamResult(result) {
	let template = '';
	if(result) {
		let calories;
		let infoTemplate ='';
		let newLabelStr = result.recipe.label;
		if((result.recipe.calories) && (result.recipe.yield)) {
			calories = result.recipe.calories/result.recipe.yield;
			calories = Math.floor(calories);
			infoTemplate = `Calories:${calories}, Yield:${result.recipe.yield}`;
		}
		
		template = `
		<div class="col-3">
		<div class="thumbnail-div">
		<a class="thumbnail" data-recipeUrl="${result.recipe.url}" title="${result.recipe.label}">	
		<img src=${result.recipe.image} alt="${result.recipe.label}" tabindex="0"></a>
		<p class="recipe-label">${newLabelStr}</P>
		<p class="recipe-info">${infoTemplate}</p>
		<a href="${result.recipe.url}" target="_blank">${result.recipe.source}</a>
		</div>
		</div>
		`;
	}
	else { // In case of issue with results, display data not found message
		template = `
		<div class="col-3">
		<div class="thumbnail-div">
		<div class="thumbnail">
		<img src="Images/warning-147699_640.png" alt="Data not found!"></a>
		</div>
		<p class="recipe-label">oops... recipe not found!</P>
		</div>
		</div>
		`;		
	}
	return template;
}

function displayEdamamResults(data, meal, edamamFirstRecipeNum, edamamLastRecipeNum) {
	let pageContent;
	let template;
	let imgSrc;
	let imgAlt;
	let divId;
	let prevButton = '';
	let nextButton = '';
	let prevButtonId;
	let nextButtonId;
	
	// Make sure that data is valid, if not display error message
	if(!data) {
		alert("Error! Sorry, we can't display any recipe!");
		return;
	}
	
	edamamIngredientData = data;
	divId = '#js-edamam-ingredient-results';
	prevButtonId = 'js-edamam-prev-page-ingredient';
	nextButtonId = 'js-edamam-next-page-ingredient';
	
	if(edamamIngredientData.count > edamamGetMaxRecipeNum) {
		edamamIngredientData.count = edamamGetMaxRecipeNum;
	}
	if(edamamFirstRecipeNum < 0) {
		edamamFirstRecipeNum = 0;
	}
	if(edamamLastRecipeNum > edamamIngredientData.count) {
		edamamLastRecipeNum = edamamIngredientData.count;
	}
	
	if(edamamFirstRecipeNum > 0) {
		prevButton = `<button type="button" class="prev-page-button" id=${prevButtonId}><span>Previous</span></button>`;
	}
	
	if(edamamLastRecipeNum < edamamIngredientData.count) {
		nextButton = `<button type="button" class="next-page-button" id=${nextButtonId}><span>Next</span></button>`;		
	}
	
	// In case of no data display a message to user
	if(data.count === 0) {
		template = `
		<div class="row">
		<p>Sorry, we couldn't find any recipe!</p>
		</div>
		`;
	}
	else {
		// Build the template for the actual results to display on the page
		let results = [];
		let totalResults = data.count;
		let totalResultsStr = `We found about ${data.count} results`;
		
		try {
			for(let i = edamamFirstRecipeNum; i < edamamLastRecipeNum; i++) {
				let result = renderEdamamResult(data.hits[i]);
				if(result) {
					results.push(result);
				}
			}
		}
		catch(err) {
			console.log(err);
			return;
		} 
		
		if(results.length > 0) {
			template = `
			<div class="row recipe-row">
			<section role="region">
			<legend class="results-title">Recipes:</legend>
			${results.join("")}
			</div>
			<div>
			${prevButton}
			${nextButton}
			</div>
			</region>
			`;	
		}
	}
	
	$(divId).html(template);
}

// Callback function
function displayEdamamIngredientResults(data) {
	edamamMinIngredientRecipeNum = 0;
	edamamMaxIngredientRecipeNum = edamamRecipesPerPage;
	displayEdamamResults(data, 'Ingredient', edamamMinIngredientRecipeNum, edamamMaxIngredientRecipeNum);
}

function edamamNextPageIngredientClick() {
	$('#js-edamam-ingredient-results').on('click', '#js-edamam-next-page-ingredient', function (event) {
		edamamMaxIngredientRecipeNum += edamamRecipesPerPage;
		edamamMinIngredientRecipeNum += edamamRecipesPerPage;
		displayEdamamResults(edamamIngredientData, "Ingredient", edamamMinIngredientRecipeNum, edamamMaxIngredientRecipeNum);
	});
}

function edamamPrevPageIngredientClick() {
	$('#js-edamam-ingredient-results').on('click', '#js-edamam-prev-page-ingredient', function (event) {
		edamamMinIngredientRecipeNum -= edamamRecipesPerPage;
		edamamMaxIngredientRecipeNum -= edamamRecipesPerPage;
		if(edamamMinIngredientRecipeNum < 0) {
			edamamMinIngredientRecipeNum = 0;
		}
		displayEdamamResults(edamamIngredientData, "Ingredient", edamamMinIngredientRecipeNum, edamamMaxIngredientRecipeNum);
	});
}

function searchSubmit() {
	$('.js-search-form').submit(event => {
		event.preventDefault();
		let minCaloriesPerMeal = defaultMinCalories;
		let maxCaloriesPerMeal = defaultMaxCalories;
		
		// Fetch all the the data from the form
		var fields = $("form").serializeArray();
		
		// Remove previous results from the page
		$('.js-edamam-results').empty();
		// Update 'searchQuery' with the values from the form
		jQuery.each(fields, function (i, field) {
			switch (field.name) {
				case "ingredient-query":
				searchQuery.ingredientQuery = field.value;
				break;
				
				case "diet":
				if (field.value) {
					searchQuery.diet = field.value;
				}
				break;
				
				case "calories-min":
				if (field.value) {
					minCaloriesPerMeal = field.value;
				}
				break;
				case "calories-max":
				if (field.value) {
					maxCaloriesPerMeal = field.value;
				}
				break;
			}
		});
		
		if(searchQuery.ingredientQuery.length === 0) {
			alert("Sorry, we can't help you if you don't tell us what you want to eat. Please enter preferences for at least one ingredient.");
			return;
		}
		
		// After fetching data from the form, validate min and max calories and update the system
		if (parseInt(maxCaloriesPerMeal) <= parseInt(minCaloriesPerMeal)) {
			alert("Max calories should be higher than Min calories!");
			return;
		}
		searchQuery.calories = minCaloriesPerMeal + '-' + maxCaloriesPerMeal;
		
		//$( "div" ).hide( "drop", { direction: "down" }, "slow" );
		$('.search-container').slideUp("slow");
		$('#search-again-button').show();
		
		if (searchQuery.ingredientQuery) {
			
			searchQuery.query = searchQuery.ingredientQuery;
			getEdamamRecipes(searchQuery, displayEdamamIngredientResults, "Ingredient");
			
		}	
	});
}

function handleSearch() {
	searchSubmit();
	edamamThumbnailClick();
	edamamThumbnailKeyup();
	edamamNextPageIngredientClick();
	edamamPrevPageIngredientClick();
	searchAgainButtonClick();
	clearSearchFieldsClick();
}
$(handleSearch);
