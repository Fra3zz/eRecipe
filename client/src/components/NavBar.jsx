import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="nav">
                <li className="nav-item dropdown">
                    <a 
                        className="nav-link dropdown-toggle" 
                        data-bs-toggle="dropdown" 
                        href="#" 
                        role="button" 
                        aria-expanded="false"
                    >
                        Menu
                    </a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="/">Home</a></li>
                        <li><a className="dropdown-item" href="/ingredients/">View/Add Ingredients</a></li>
                        <li><a className="dropdown-item" href="/ingredients/update/">Update Ingredient</a></li>
                        <li><a className="dropdown-item" href="/add/recipe/">Add Recipe</a></li>
                        <li><a className="dropdown-item" href="/add/recipe/ingredient/">Add Ingredient to Recipe</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
