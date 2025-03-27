import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; // Correct import for jspdf-autotable

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

    // Generate PDF
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Shopping List", 14, 22);
        doc.setFontSize(12);
        doc.setTextColor(100);

        const tableColumn = ["Ingredient", "Amount"];
        const tableRows = [];

        ingredients.forEach(ingredient => {
            const ingredientData = [
                ingredient.ingredient || 'Unknown Name',
                ingredient.amount || 'N/A'
            ];
            tableRows.push(ingredientData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30,
        });

        doc.save('shopping-list.pdf');
    };

    return (
        <div className="ingredient-list-container">
            <h1>Ingredient List</h1>
            <button
                onClick={generatePDF}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    padding: '10px 20px',
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                <i className="fas fa-file-pdf" style={{ marginRight: '8px' }}></i>
                PDF
            </button>
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
