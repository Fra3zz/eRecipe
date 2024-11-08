import { useState, useEffect } from "react";
import IngredientList from "./Ingredients";
import axios from 'axios';
import "./../../styles/recipe-book.scss";

const domain = import.meta.env.VITE_DOMAIN;

export default function GetIngredients() {
    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${domain}/api/ingredient/`)
            .then(response => Array.isArray(response.data) ? setIngredients(response.data) : setIngredients([]))
            .catch(error => {
                setError('Error fetching ingredients');
                console.error(error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${domain}/api/ingredient/`, {
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
            console.error(error);
        });
    };

    return (
        <div className="card p-4">

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
            <br />
            {error && <p className="text-danger">{error}</p>}
            {(Array.isArray(ingredients) ? ingredients : []).map((ingredient) => (
                <IngredientList key={ingredient.name} name={ingredient.name} />
            ))}
        </div>
    );
}
