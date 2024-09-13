const searchBtn = document.querySelector(".searchbtn");
const searchBox = document.querySelector(".searchbox");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-detail-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

const fetchRecipe = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipe...</h2>";
    
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    
    recipeContainer.innerHTML = "";
    
    if (response.meals) {
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add("recipe");
            
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strArea}</p>
                <p>${meal.strCategory}</p>
            `;
            
            const button = document.createElement('button');
            button.classList.add("showRecipe");
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            // Adding event listener to show recipe in a popup
            button.addEventListener("click", () => {
                openRecipeepopup(meal);
            });
            
            recipeContainer.appendChild(recipeDiv);
        });
    } else {
        recipeContainer.innerHTML = "<h2>No recipes found.</h2>";
    }
};

// Creating a function to fetch ingredients
const fetchIngredient = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    return ingredientsList; // Return the ingredients list as a string
};

// Creating a function to open the recipe popup
const openRecipeepopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="IngredientList">${fetchIngredient(meal)}</ul>
        
        <div class="recipe-instruction">
            <h3 >Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `;

    
    recipeDetailsContent.parentElement.style.display = "block";
};

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (searchInput) {
        fetchRecipe(searchInput);
    }
});

// Closing the popup (optional, if you have a close button)
recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});
