import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";
import "./../../styles/recipe-book.scss";

let INGREDIENTS_URL = "http://127.0.0.1/api/ingredient/";
let RECIPES_URL = "http://127.0.0.1/api/recipe/";
let POST_URL = "http://127.0.0.1/api/recipe/ingredients/";

const AddIngredientToRecipe = () => {
    const [ingredientObject, setIngredientObject] = useState({
        ingredient: "",
        amount: "",
        recipe: ""
    });

    const [ingredientsList, setIngredientsList] = useState([]);
    const [recipesList, setRecipesList] = useState([]);

    useEffect(() => {
        axios.get(INGREDIENTS_URL)
            .then(response => setIngredientsList(response.data))
            .catch(error => console.error("Error fetching ingredients:", error));

        axios.get(RECIPES_URL)
            .then(response => setRecipesList(response.data))
            .catch(error => console.error("Error fetching recipes:", error));
    }, []);

    const handleIngredientChange = (selectedOption) => {
        setIngredientObject((prev) => ({
            ...prev,
            ingredient: selectedOption ? selectedOption.value : ""
        }));
    };

    const handleRecipeChange = (selectedOption) => {
        setIngredientObject((prev) => ({
            ...prev,
            recipe: selectedOption ? selectedOption.value : ""
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
            alert("Error adding ingredient or ingredient has already been added to this recipe", error);
        }
    };

    return (
        <div className="card p-4">
            <form onSubmit={postIngredientToRecipe}>
                <div className="mb-3">
                    <label htmlFor="ingredient" className="form-label">Ingredient:</label>
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
                </div>
                <div className="mb-3">
                    <label htmlFor="recipe" className="form-label">Recipe:</label>
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
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount:</label>
                    <input
                        type="text"
                        id="amount"
                        className="form-control"
                        value={ingredientObject.amount}
                        onChange={(e) => setIngredientObject({ ...ingredientObject, amount: e.target.value })}
                        required
                        placeholder="Amount (Ex: 12oz)"
                    />
                </div>
                <button type="submit" className="btn btn-custom">Submit</button>
            </form>
        </div>
    );
};

export default AddIngredientToRecipe;
