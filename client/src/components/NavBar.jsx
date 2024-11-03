import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container">
                <a className="navbar-brand" href="/">eRecipe Book</a>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNavDropdown" 
                    aria-controls="navbarNavDropdown" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/ingredients/">View/Add Ingredients</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/ingredients/update/">Update Ingredient</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/add/recipe/">Add Recipe</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/add/recipe/ingredient/">Add Ingredient to Recipe</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
