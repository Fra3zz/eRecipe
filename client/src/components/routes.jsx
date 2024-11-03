import { Routes, Route } from "react-router-dom";
import { Home } from "./Home/home";
import GetIngredients from "./ingredients/IngredientsRequest";
import UpdateIngredients from "./ingredients/updateIngredients";
import GetRecipes, { AddRecipe } from "./recipe/getAddRecipe";
import AddIngredientToRecipe from "./recipe/AddIngredientToRecipe";
import GetRecipeIngredients from "./recipe/getRecipeINgredients";

export default function ROUTES() {
    return (
        <main className="container my-4">
            <Routes>
                <Route path="/home/" element={<Home />} />
                <Route path="/ingredients/" element={<GetIngredients />} />
                <Route path="/ingredients/update/" element={<UpdateIngredients />} />
                <Route path="/" element={<GetRecipes />} />
                <Route path="/add/recipe/" element={<AddRecipe />} />
                <Route path="/add/recipe/ingredient/" element={<AddIngredientToRecipe />} />
                <Route path="/recipe/ingredients/:recipeName" element={<GetRecipeIngredients />} />
            </Routes>
        </main>
    );
}
