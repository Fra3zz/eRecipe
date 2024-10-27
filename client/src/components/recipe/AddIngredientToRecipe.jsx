import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select"; // Import React Select

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

  // Fetch ingredients and recipes on component mount
  useEffect(() => {
    axios.get(INGREDIENTS_URL)
      .then(response => setIngredientsList(response.data))
      .catch(error => console.error("Error fetching ingredients:", error));

    axios.get(RECIPES_URL)
      .then(response => setRecipesList(response.data))
      .catch(error => console.error("Error fetching recipes:", error));
  }, []);

  // Handler for ingredient dropdown change
  const handleIngredientChange = (selectedOption) => {
    setIngredientObject((prev) => ({
      ...prev,
      ingredient: selectedOption ? selectedOption.value : ""
    }));
  };

  // Handler for recipe dropdown change
  const handleRecipeChange = (selectedOption) => {
    setIngredientObject((prev) => ({
      ...prev,
      recipe: selectedOption ? selectedOption.value : ""
    }));
  };

  // Form submission handler
  const postIngredientToRecipe = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(POST_URL, ingredientObject);
      if (response.status === 201) {
        alert("Ingredient added to recipe");
      }
    } catch (error) {
      console.error("Error adding ingredient:", error);
    }
  };

  return (
    <div>
      <form onSubmit={postIngredientToRecipe}>
        {/* Ingredient Dropdown with Search */}
        <label htmlFor="ingredient">Ingredient:</label>
        <Select
          id="ingredient"
          options={ingredientsList.map(ingredient => ({
            value: ingredient.id,
            label: ingredient.name
          }))}
          onChange={handleIngredientChange}
          placeholder="Select or search for an ingredient"
          isClearable
        />

        {/* Amount Input */}
        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          value={ingredientObject.amount}
          onChange={(e) => setIngredientObject({ ...ingredientObject, amount: e.target.value })}
          required="True"
        />

        {/* Recipe Dropdown with Search */}
        <label htmlFor="recipe">Recipe:</label>
        <Select
          id="recipe"
          options={recipesList.map(recipe => ({
            value: recipe.id,
            label: recipe.name
          }))}
          onChange={handleRecipeChange}
          placeholder="Select or search for a recipe"
          isClearable
        />

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddIngredientToRecipe;
