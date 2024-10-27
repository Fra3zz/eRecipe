import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const baseUrl = "http://127.0.0.1/api/recipe/ingredients/";

const GetRecipeIngredients = () => {
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const { recipeName } = useParams();  // Get recipeName from URL parameters

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await axios.get(`${baseUrl}${recipeName}`); 
                setRecipeIngredients(response.data); 
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        };

        fetchIngredients();
    }, [recipeName]);

    return (
        <div>
            {recipeIngredients.length > 0 ? (
                recipeIngredients.map((ingredient, index) => (
                    <p key={ingredient.recipeName}>Name: {ingredient.recipeName}
                        <br />
                        
                        Ingredient: {ingredient.ingredient}

                    </p>
                ))
            ) : (
                <p>No ingredients found for this recipe.</p>
            )}
        </div>
    );
};

export default GetRecipeIngredients;
