import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for internal routing

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
        <div>
            {recipe.map((rec) => (
                <div key={rec.id}>
                    <p>
                        Name: {rec.name}
                        <br />
                        Description: {rec.description}
                        <br />
                        Portion Size: {rec.portion_size}
                        <br />
                        <Link to={`/recipe/ingredients/${rec.name}`} id={rec.name}>
                            View {rec.name} Ingredients
                        </Link>
                    </p>
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

    const [recipeList, setRecipeList] = useState([]);

    const postNewRecipe = async () => {
        try {
            const response = await axios.post(postURL, newRecipe);
            if (response.status === 201) {
                alert("Recipe Added!");
                setRecipeList([...recipeList, newRecipe]);
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
        <div>
            <form onSubmit={handleButtonClick}>
                <label htmlFor="name">Name:</label>
                <input 
                    type="text" 
                    id="name" 
                    value={newRecipe.name} 
                    onChange={handleInputChange} 
                />

                <label htmlFor="description">Description:</label>
                <input 
                    type="text" 
                    id="description" 
                    value={newRecipe.description} 
                    onChange={handleInputChange} 
                />

                <label htmlFor="portion_size">Portion Size:</label>
                <input 
                    type="text" 
                    id="portion_size" 
                    value={newRecipe.portion_size} 
                    onChange={handleInputChange} 
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
