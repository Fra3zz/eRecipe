import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./../../styles/recipe-book.scss";

const domain = import.meta.env.VITE_DOMAIN;
const getURL = `${domain}/api/recipe/`;

const GetRecipes = () => {
    const [recipe, setRecipe] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        axios.get(getURL)
            .then((response) => Array.isArray(response.data) ? response.data : [])
            .then((data) => {
                setRecipe(data);
                setFilteredRecipes(data); // Initialize with full recipe list
            })
            .catch(error => {
                console.error("Error fetching recipes:", error);
                setRecipe([]);
                setFilteredRecipes([]);
            });
    }, []);

    // Filter recipes based on search query
    useEffect(() => {
        const filtered = recipe.filter((rec) =>
            rec.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRecipes(filtered);
    }, [searchQuery, recipe]);

    // Toggle the search bar open/close state without clearing the search query
    const toggleSearchBar = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <div>
            {/* Left-Aligned Animated Expandable Search Bar */}
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "20px", alignItems: "center" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #ccc",
                        borderRadius: "25px",
                        padding: isSearchOpen ? "5px 15px" : "5px",
                        transition: "all 0.3s ease",
                        width: isSearchOpen ? "60%" : "40px",
                        cursor: "pointer",
                        backgroundColor: isSearchOpen ? "#f9f9f9" : "#e0e0e0",
                        overflow: "hidden",
                    }}
                >
                    {/* Click on the icon to toggle open/close */}
                    <span
                        onClick={toggleSearchBar}
                        style={{
                            fontSize: "20px",
                            color: "#555",
                            marginRight: isSearchOpen ? "10px" : "0",
                            transition: "margin-right 0.3s ease",
                            cursor: "pointer",
                        }}
                    >
                        🔍
                    </span>
                    <input
                        type="text"
                        placeholder={isSearchOpen ? "Search recipes..." : ""}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClick={(e) => e.stopPropagation()} // Prevent collapsing when clicking on input
                        style={{
                            flex: 1,
                            padding: "5px",
                            fontSize: "16px",
                            border: "none",
                            outline: "none",
                            opacity: isSearchOpen ? 1 : 0,
                            transition: "opacity 0.3s ease, width 0.3s ease",
                        }}
                    />
                </div>
            </div>

            <div className="row">
                {(Array.isArray(filteredRecipes) ? filteredRecipes : []).map((rec) => (
                    <div key={rec.id} className="col-md-6 mb-4">
                        <div className="card p-3">
                            <p style={{ textAlign: "center", fontWeight: "bold", textWrap: "balance" }}>
                                <strong>{rec.name}</strong>
                            </p>
                            <p>
                                <strong>Description:</strong><br />
                                {rec.description ? rec.description.split('\n').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                )) : "No description available"}
                            </p>
                            <p>
                                <strong>Instructions:</strong><br />
                                {rec.instructions ? rec.instructions.split('\n').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                )) : "No instructions available"}
                            </p>
                            <p>
                                <strong>Portion Size:</strong> {rec.portion_size}
                            </p>
                            <Link to={`/recipe/ingredients/${rec.name}`} id={rec.name} className="btn btn-link p-0">
                                View {rec.name} Ingredients
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
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
    const [scrollPosition, setScrollPosition] = useState(0);
    const instructionsRef = useRef(null);

    const maxChars = 1500;

    // Function to capture the current scroll position
    const saveScrollPosition = () => {
        setScrollPosition(window.scrollY);
    };

    // Function to restore the saved scroll position
    const restoreScrollPosition = () => {
        window.scrollTo({ top: scrollPosition, behavior: "instant" });
    };

    const handleInstructionsChange = (e) => {
        saveScrollPosition();
        const value = e.target.value.slice(0, maxChars);
        setNewRecipe((prev) => ({
            ...prev,
            instructions: value
        }));
        setCharCount(value.length);

        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    useEffect(() => {
        restoreScrollPosition();
    }, [newRecipe]);

    const postNewRecipe = async () => {
        try {
            const response = await axios.post(getURL, newRecipe);
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
        saveScrollPosition();
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
                        ref={instructionsRef}
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
