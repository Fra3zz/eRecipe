import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./../../styles/recipe-book.scss";

const getURL = "http://127.0.0.1/api/recipe/";
const postURL = getURL;

const GetRecipes = () => {
    const [recipe, setRecipe] = useState([]);

    useEffect(() => {
        axios.get(getURL)
            .then((response) => response.data)
            .then((data) => setRecipe(data))
            .catch(error => console.error("Error fetching recipes:", error));
    }, []);

    return (
        <div className="row">
            {recipe.map((rec) => (
                <div key={rec.id} className="col-md-6 mb-4">
                    <div className="card p-3">
                        <p>
                            <strong>Name:</strong> {rec.name}
                            <br />
                            <strong>Description:</strong> {rec.description}
                            <br />
                            <strong>Portion Size:</strong> {rec.portion_size}
                            <br />
                            <Link to={`/recipe/ingredients/${rec.name}`} id={rec.name} className="btn btn-link p-0">
                                View {rec.name} Ingredients
                            </Link>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GetRecipes;

export const AddRecipe = () => {
    const [newRecipe, setNewRecipe] = useState({
        name: "",
        description: "",
        portion_size: ""
    });

    const postNewRecipe = async () => {
        try {
            const response = await axios.post(postURL, newRecipe);
            if (response.status === 201) {
                alert("Recipe Added!");
                setNewRecipe({
                    name: "",
                    description: "",
                    portion_size: ""
                });
            }
        } catch (error) {
            console.error("There was an error adding the recipe!", error);
        }
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        postNewRecipe();
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewRecipe(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    return (
        <div className="card p-4">
            <form onSubmit={handleButtonClick}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        className="form-control"
                        value={newRecipe.name} 
                        onChange={handleInputChange} 
                        required
                        placeholder="Name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <input 
                        type="text" 
                        id="description" 
                        className="form-control"
                        value={newRecipe.description} 
                        onChange={handleInputChange} 
                        required
                        placeholder="Description"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="portion_size" className="form-label">Portion Size:</label>
                    <input 
                        type="text" 
                        id="portion_size" 
                        className="form-control"
                        value={newRecipe.portion_size} 
                        onChange={handleInputChange} 
                        required
                        placeholder="Portion Size (Ex: 3 people)"
                    />
                </div>
                <button type="submit" className="btn btn-custom">Submit</button>
            </form>
        </div>
    );
};
