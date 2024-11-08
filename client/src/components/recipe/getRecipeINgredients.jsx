import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Confetti from "react-confetti";
import "./../../styles/recipe-book.scss";

const domain = import.meta.env.VITE_DOMAIN;
const baseUrl = `${domain}/api/recipe/ingredients/`;

const GetRecipeIngredients = () => {
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [checkedIngredients, setCheckedIngredients] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);
    const { recipeName } = useParams();

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await axios.get(`${baseUrl}${recipeName}`);
                setRecipeIngredients(response.data);
                setCheckedIngredients(Array(response.data.length).fill(false));
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        };

        fetchIngredients();
    }, [recipeName]);

    // Handle checkbox toggle
    const toggleCheck = (index) => {
        const updatedCheckedIngredients = [...checkedIngredients];
        updatedCheckedIngredients[index] = !updatedCheckedIngredients[index];
        setCheckedIngredients(updatedCheckedIngredients);

        // Show confetti if all checkboxes are checked
        if (updatedCheckedIngredients.every((checked) => checked)) {
            setShowConfetti(true);
        } else {
            setShowConfetti(false);
        }
    };

    return (
        <div className="card p-4">
            {showConfetti && <Confetti />}

            <h1>
                Ingredients for <strong>{recipeName}</strong>
            </h1>
            <br />
            {recipeIngredients.length > 0 ? (
                recipeIngredients.map((ingredient, index) => (
                    <div
                        key={index}
                        className="ingredient-box mb-3"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            backgroundColor: checkedIngredients[index] ? "#d3d3d3" : "#f9f9f9",
                            color: checkedIngredients[index] ? "#666" : "#000",
                            transition: "background-color 0.3s ease, color 0.3s ease",
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={checkedIngredients[index]}
                            onChange={() => toggleCheck(index)}
                            style={{ marginRight: "10px" }}
                        />
                        <div>
                            <p style={{ margin: 0 }}>
                                <strong>Ingredient:</strong> {ingredient.ingredient}
                            </p>
                            <p style={{ margin: 0 }}>
                                <strong>Amount:</strong> {ingredient.amount}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No ingredients found for this recipe.</p>
            )}

            {showConfetti && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <h2>🎉 You have all the ingredients to make {recipeName}! 🎉</h2>
                </div>
            )}
        </div>
    );
};

export default GetRecipeIngredients;
