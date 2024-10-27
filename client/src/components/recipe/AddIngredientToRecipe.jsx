import axios from "axios";
import { useState } from "react";

let URL = "http://127.0.0.1/api/recipe/ingredients/";

const AddIngredientToRecipe = () => {
  const [ingredientObject, setIngredientObject] = useState({
    ingredient: "",
    amount: "",
    recipe: ""
  });

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
      const response = await axios.post(URL, ingredientObject);
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
        <input
          type="text"
          id="ingredient"
          value={ingredientObject.ingredient}
          onChange={handleChange}
        />

        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          value={ingredientObject.amount}
          onChange={handleChange}
        />

        <label htmlFor="recipe">Recipe</label>
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
