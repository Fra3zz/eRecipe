import axios from "axios";
import { useState, useEffect } from "react";

let INGREDIENTS_URL = "http://127.0.0.1/api/ingredient/";
let RECIPES_URL = "http://127.0.0.1/api/recipe/";
let POST_URL = "http://127.0.0.1/api/recipe/ingredients/";

const AddIngredientToRecipe = () => {
  const [ingredientObject, setIngredientObject] = useState({
    ingredient: "", // store the ingredient ID here
    amount: "",
    recipe: "" // store the recipe ID here
  });

  const [ingredientsList, setIngredientsList] = useState([]); // for ingredient dropdown
  const [recipesList, setRecipesList] = useState([]); // for recipe dropdown

  useEffect(() => {
    // Fetch ingredient names and IDs
    axios.get(INGREDIENTS_URL)
      .then(response => setIngredientsList(response.data))
      .catch(error => console.error("Error fetching ingredients:", error));

    // Fetch recipe names and IDs
    axios.get(RECIPES_URL)
      .then(response => setRecipesList(response.data))
      .catch(error => console.error("Error fetching recipes:", error));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setIngredientObject((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const postIngredientToRecipe = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(POST_URL, ingredientObject);
      if (response.status === 201) {
        alert("Ingredient added to recipe");
      }
    } catch (error) {
      alert("Error adding ingredient or ingredient has already been added to the recipe:", error);
    }
  };

  return (
    <div>
      <form onSubmit={postIngredientToRecipe}>
        {/* Ingredient Dropdown */}
        <label htmlFor="ingredient">Ingredient:</label>
        <select
          id="ingredient"
          value={ingredientObject.ingredient}
          onChange={handleChange}
        >
          <option value="">Select an ingredient</option>
          {ingredientsList.map((ingredient) => (
            <option key={ingredient.id} value={ingredient.id}>
              {ingredient.name}
            </option>
          ))}
        </select>

        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          value={ingredientObject.amount}
          onChange={handleChange}
        />

        {/* Recipe Dropdown */}
        <label htmlFor="recipe">Recipe:</label>
        <select
          id="recipe"
          value={ingredientObject.recipe}
          onChange={handleChange}
        >
          <option value="">Select a recipe</option>
          {recipesList.map((recipe) => (
            <option key={recipe.id} value={recipe.id}>
              {recipe.name}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddIngredientToRecipe;
