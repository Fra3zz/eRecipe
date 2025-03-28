import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie for cookie management
import Confetti from "react-confetti";
import "./../../styles/recipe-book.scss";

const domain = import.meta.env.VITE_DOMAIN;
const baseUrl = `${domain}/api/recipe/ingredients/`;
const getInstructionsURL = `${domain}/api/recipe/`; // Base URL for instructions

const GetRecipeIngredients = () => {
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [recipeInstructions, setRecipeInstructions] = useState(""); // State for instructions
    const [checkedIngredients, setCheckedIngredients] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [ingredientAmount, setIngredientAmount] = useState("");
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

        const fetchInstructions = async () => {
            try {
                const response = await axios.get(`${getInstructionsURL}${recipeName}`);
                setRecipeInstructions(response.data.instructions); // Assuming response contains 'instructions'
            } catch (error) {
                console.error("Error fetching instructions:", error);
            }
        };

        fetchIngredients();
        fetchInstructions();
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

    // Handle adding ingredient to cookies
    const handleAddIngredient = (ingredient) => {
        setSelectedIngredient(ingredient);
        setShowPopup(true);
    };

    const handlePopupSubmit = () => {
        if (selectedIngredient) {
            const existingCookies = Cookies.get('ingredients');
            const ingredientsList = existingCookies ? JSON.parse(existingCookies) : [];
            const newIngredient = {
                ingredient: selectedIngredient.ingredient,
                amount: ingredientAmount
            };
            Cookies.set('ingredients', JSON.stringify([...ingredientsList, newIngredient]));
        }
        setShowPopup(false);
        setIngredientAmount("");
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
                            <button onClick={() => handleAddIngredient(ingredient)}>
                                Add to Shopping List
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No ingredients found for this recipe.</p>
            )}

            {recipeInstructions && (
                <div className="instructions">
                    <h2>Instructions</h2>
                    <p style={{ whiteSpace: "pre-wrap" }}>{recipeInstructions}</p>
                </div>
            )}

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Add Ingredient to Cookie</h2>
                        <label>
                            Amount:
                            <input
                                type="text"
                                value={ingredientAmount}
                                onChange={(e) => setIngredientAmount(e.target.value)}
                            />
                        </label>
                        <button onClick={handlePopupSubmit}>Submit</button>
                        <button onClick={() => setShowPopup(false)}>Cancel</button>
                    </div>
                </div>
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
