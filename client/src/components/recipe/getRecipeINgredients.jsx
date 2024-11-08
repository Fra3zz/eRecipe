import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./../../styles/recipe-book.scss";

const domain = import.meta.env.VITE_DOMAIN;
const baseUrl = `${domain}/api/recipe/ingredients/`;


const GetRecipeIngredients = () => {


    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const { recipeName } = useParams();

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
        <div className="card p-4">
            {recipeIngredients.length > 0 ? (
                recipeIngredients.map((ingredient, index) => (
                    <div key={index} className="mb-2">
                        <p>
                            <strong>Name:</strong> {ingredient.recipeName}
                            <br />
                            <strong>Ingredient:</strong> {ingredient.ingredient}
                            <br />
                            <strong>Amount:</strong> {ingredient.amount}
                        </p>
                    </div>
                ))
            ) : (
                <p>No ingredients found for this recipe.</p>
            )}
        </div>
    );
};

export default GetRecipeIngredients;
