import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../../styles/recipe-book.scss";

const domain = import.meta.env.VITE_DOMAIN;

const IngredientManager = () => {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [newName, setNewName] = useState("");

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await axios.get(`${domain}/api/ingredient/`);
                setIngredients(response.data);
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        };

        fetchIngredients();
    }, []);

    const handleSelectChange = (event) => {
        const selectedId = event.target.value;
        const ingredient = ingredients.find((item) => item.id === parseInt(selectedId));
        setSelectedIngredient(ingredient);
        setNewName(ingredient ? ingredient.name : "");
    };

    const handleDelete = async () => {
        if (selectedIngredient) {
            try {
                await axios.delete(`${domain}/api/ingredient/${selectedIngredient.id}`);
                setIngredients(ingredients.filter((item) => item.id !== selectedIngredient.id));
                setSelectedIngredient(null);
                alert(`Ingredient deleted successfully.`);
            } catch (error) {
                alert("Error deleting ingredient. Please try again.");
                console.error("Error deleting ingredient:", error);
            }
        }
    };

    const handleUpdate = async () => {
        if (selectedIngredient && newName) {
            try {
                await axios.put(`${domain}/api/ingredient/${selectedIngredient.id}`, { name: newName });
                setIngredients(ingredients.map((item) =>
                    item.id === selectedIngredient.id ? { ...item, name: newName } : item
                ));
                alert(`Ingredient updated successfully.`);
            } catch (error) {
                alert("Error updating ingredient. Please try again.");
                console.error("Error updating ingredient:", error);
            }
        }
    };

    return (
        <div className="card p-4">
            <h1>Ingredient Manager</h1>
            <select onChange={handleSelectChange} value={selectedIngredient ? selectedIngredient.id : ""} className="form-select mb-3">
                <option value="">Select an Ingredient</option>
                {ingredients.map((ingredient) => (
                    <option key={ingredient.id} value={ingredient.id}>
                        {ingredient.name}
                    </option>
                ))}
            </select>

            {selectedIngredient && (
                <div>
                    <h2>Manage Ingredient: {selectedIngredient.name}</h2>
                    <label className="form-label">Update Name:</label>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="form-control mb-3"
                    />
                    <button onClick={handleUpdate} className="btn btn-custom me-2">Update</button>
                    <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                </div>
            )}
        </div>
    );
};

export default IngredientManager;
