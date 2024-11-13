import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const ViewIngredientCookieList = () => {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        // Load ingredients from cookies when the component mounts
        const storedIngredients = Cookies.get('ingredients');
        if (storedIngredients) {
            try {
                const parsedIngredients = JSON.parse(storedIngredients);
                console.log('Parsed Ingredients:', parsedIngredients); // Debugging line
                setIngredients(parsedIngredients);
            } catch (error) {
                console.error('Failed to parse ingredients from cookies:', error);
            }
        }
    }, []);

    // Handle editing the amount of an ingredient
    const handleEditAmount = (index, newAmount) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index].amount = newAmount;
        setIngredients(updatedIngredients);
        Cookies.set('ingredients', JSON.stringify(updatedIngredients));
    };

    // Handle deleting an ingredient
    const handleDeleteIngredient = (index) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
        Cookies.set('ingredients', JSON.stringify(updatedIngredients));
    };

    return (
        <div className="ingredient-list-container">
            <h1>Ingredient List</h1>
            {ingredients.length > 0 ? (
                ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-item">
                        <p>
                            <strong>Ingredient:</strong> {ingredient.ingredient || 'Unknown Name'}
                        </p>
                        <p>
                            <strong>Amount:</strong>
                            <input
                                type="text"
                                value={ingredient.amount}
                                onChange={(e) => handleEditAmount(index, e.target.value)}
                            />
                        </p>
                        <button onClick={() => handleDeleteIngredient(index)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No ingredients in the list.</p>
            )}
        </div>
    );
};

export default ViewIngredientCookieList;
