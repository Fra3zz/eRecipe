import React, { useState, useEffect } from "react";
import axios from "axios";

const IngredientManager = () => {
  // State to hold the list of ingredients and the selected ingredient
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [newName, setNewName] = useState("");
  const [message, setMessage] = useState(""); // To store success or error messages

  // Fetch ingredients from the API when the component mounts
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get("http://127.0.0.1/api/ingredient/");
        setIngredients(response.data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

  // Handle selecting an ingredient from the dropdown
  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const ingredient = ingredients.find((item) => item.id === parseInt(selectedId));
    setSelectedIngredient(ingredient);
    setNewName(ingredient ? ingredient.name : "");
    setMessage(""); // Clear any previous messages when a new selection is made
  };

  // Handle deleting an ingredient
  const handleDelete = async () => {
    if (selectedIngredient) {
      try {
        await axios.delete(`http://127.0.0.1/api/ingredient/${selectedIngredient.id}`);
        setIngredients(ingredients.filter((item) => item.id !== selectedIngredient.id)); // Remove from state
        setSelectedIngredient(null);
        setMessage(`Ingredient deleted successfully.`);
      } catch (error) {
        setMessage("Error deleting ingredient. Please try again.");
        console.error("Error deleting ingredient:", error);
      }
    }
  };

  // Handle updating the ingredient's name
  const handleUpdate = async () => {
    if (selectedIngredient && newName) {
      try {
        await axios.put(`http://127.0.0.1/api/ingredient/${selectedIngredient.id}`, { name: newName });
        setIngredients(ingredients.map((item) =>
          item.id === selectedIngredient.id ? { ...item, name: newName } : item
        )); // Update the name in the state
        setMessage(`Ingredient updated successfully.`);
      } catch (error) {
        setMessage("Error updating ingredient. Please try again.");
        console.error("Error updating ingredient:", error);
      }
    }
  };

  return (
    <div>
      <h1>Ingredient Manager</h1>

      {/* Dropdown to select an ingredient */}
      <select onChange={handleSelectChange} value={selectedIngredient ? selectedIngredient.id : ""}>
        <option value="">Select an Ingredient</option>
        {ingredients.map((ingredient) => (
          <option key={ingredient.id} value={ingredient.id}>
            {ingredient.name}
          </option>
        ))}
      </select>

      {/* Show controls only if an ingredient is selected */}
      {selectedIngredient && (
        <div>
          <h2>Manage Ingredient: {selectedIngredient.name}</h2>

          {/* Input to update the ingredient name */}
          <label>
            Update Name:
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </label>
          <button onClick={handleUpdate}>Update</button>

          {/* Button to delete the ingredient */}
          <button onClick={handleDelete} style={{ marginLeft: "10px", color: "red" }}>
            Delete
          </button>
        </div>
      )}

      {/* Message to show success or error feedback */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default IngredientManager;
