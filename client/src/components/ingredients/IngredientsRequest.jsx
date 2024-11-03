import { useState, useEffect } from "react";
import IngredientList from "./Ingredients";
import axios from 'axios';
import "./../../styles/recipe-book.scss";

export default function GetIngredients() {
    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState('');
    const [error, setError] = useState(null);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://127.0.0.1/api/ingredient/", {
            name: newIngredient,
        })
        .then(response => {
            if (response.status === 201) {
                alert('Ingredient added successfully!');
                setIngredients([...ingredients, response.data]);
            }
            setNewIngredient('');
        })
        .catch(error => {
            alert('Failed to add ingredient or ingredient has already been added');
        });
    };

    return (
        <div className="card p-4">
            {error && <p className="text-danger">{error}</p>}
            {ingredients.map((ingredient) => (
                <IngredientList key={ingredient.name} name={ingredient.name} />
            ))}
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <input 
                        type="text" 
                        value={newIngredient} 
                        onChange={(e) => setNewIngredient(e.target.value)} 
                        placeholder="Enter ingredient name" 
                        className="form-control"
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-custom">Add Ingredient</button>
            </form>
        </div>
    );
}
