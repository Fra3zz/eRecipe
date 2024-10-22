import { useState, useEffect } from "react";
import IngredientList from "./Ingredients";
import axios from 'axios';

export default function GetIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetch("http://127.0.0.1/api/ingredient/")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setIngredients(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post("http://127.0.0.1/api/ingredient/", {
      name: newIngredient,
    })
    .then(response => {

      if (response.headers = 201){
      setSuccessMessage('Ingredient added successfully!');
      setIngredients([...ingredients, response.data]);  // Update the list with the new ingredient
      }
      setNewIngredient('');
    })
    .catch(error => {
      setError('Failed to add ingredient or ingredient has already been added');
    });
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}

      {/* Render the list of ingredients */}
      {ingredients.map((ingredient) => (
        <IngredientList key={ingredient.name} name={ingredient.name} />
      ))}

      {/* Form to add new ingredient */}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={newIngredient} 
          onChange={(e) => setNewIngredient(e.target.value)} 
          placeholder="Enter ingredient name" 
          required 
        />
        <button type="submit">Add Ingredient</button>
      </form>
    </div>
  );
}
