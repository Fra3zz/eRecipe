import axios from "axios";
import { useState, useEffect } from "react";

let INGREDIENTS_URL = "http://127.0.0.1/api/ingredient/";
let POST_URL = "http://127.0.0.1/api/recipe/ingredients/";

const AddIngredientToRecipe = () => {
  const [ingredientObject, setIngredientObject] = useState({
    ingredient: "", // store the ingredient ID here
    amount: "",
    recipe: ""
  });

  const [ingredientsList, setIngredientsList] = useState([]); // to store fetched ingredients

  useEffect(() => {
    // Fetch ingredient names and IDs when component mounts
    axios.get(INGREDIENTS_URL)
      .then(response => setIngredientsList(response.data))
      .catch(error => console.error("Error fetching ingredients:", error));
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
      console.error("Error adding ingredient:", error);
    }
  };

  return (
    <div>
      <form onSubmit={postIngredientToRecipe}>
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

        <label htmlFor="recipe">Recipe:</label>
        <input
          type="text"
          id="recipe"
          value={ingredientObject.recipe}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddIngredientToRecipe;
