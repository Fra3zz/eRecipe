import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./../../styles/recipe-book.scss";

const domain = import.meta.env.VITE_DOMAIN;
const getURL = `${domain}/api/recipe/`;
const postURL = getURL;

const GetRecipes = () => {
    const [recipe, setRecipe] = useState([]);

    useEffect(() => {
        axios.get(getURL)
            .then((response) => Array.isArray(response.data) ? response.data : [])
            .then((data) => setRecipe(data))
            .catch(error => {
                console.error("Error fetching recipes:", error);
                setRecipe([]);
            });
    }, []);

    return (
        <div className="row">
            {(Array.isArray(recipe) ? recipe : []).map((rec) => (
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
        portion_size: "",
        instructions: ""
    });
    const [charCount, setCharCount] = useState(0);

    const maxChars = 1500; // Set your max character limit here for instructions

    const handleInstructionsChange = (e) => {
        const value = e.target.value.slice(0, maxChars);
        setNewRecipe((prev) => ({
            ...prev,
            instructions: value
        }));
        setCharCount(value.length);
        e.target.style.height = "auto"; // Reset height to auto before expanding
        e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height based on content
    };

    const postNewRecipe = async () => {
        try {
            const response = await axios.post(postURL, newRecipe);
            if (response.status === 201) {
                alert("Recipe Added!");
                setNewRecipe({
                    name: "",
                    description: "",
                    portion_size: "",
                    instructions: ""
                });
                setCharCount(0);
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
                <div className="mb-3">
                    <label htmlFor="instructions" className="form-label">Instructions:</label>
                    <textarea
                        id="instructions"
                        className="form-control instructions-input"
                        value={newRecipe.instructions}
                        onChange={handleInstructionsChange}
                        maxLength={maxChars}
                        placeholder="Recipe Instructions (Ex: Step 1 Add to bowl)"
                        rows={1}
                    />
                    <div className="char-counter">
                        {charCount}/{maxChars} characters
                    </div>
                </div>
                
                <button type="submit" className="btn btn-custom">Submit</button>
            </form>
        </div>
    );
};
