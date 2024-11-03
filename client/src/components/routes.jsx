import { Routes, Route } from "react-router-dom";
import { Home } from "./Home/home";
import GetIngredients from "./ingredients/IngredientsRequest";
import UpdateIngredients from "./ingredients/updateIngredients";
import GetRecipes from "./recipe/getAddRecipe";
import { AddRecipe } from "./recipe/getAddRecipe";
import AddIngredientToRecipe from "./recipe/AddIngredientToRecipe";
import GetRecipeIngredients from "./recipe/getRecipeINgredients";

export default function ROUTES() {
    return (
        <main>
            <Routes>
                {/* Home Page */}
                <Route path="/home/" element={<Home />} />

                {/* Ingredient app */}
                <Route path="/ingredients/" element={<GetIngredients />} />
                <Route path="/ingredients/update/" element={<UpdateIngredients />} />

                {/* Recipe app */}
                <Route path="/" element={<GetRecipes />} />
                <Route path="/add/recipe/" element={<AddRecipe />} />
                <Route path="/add/recipe/ingredient/" element={<AddIngredientToRecipe />} />

                {/* Recipe Ingredients Route */}
                <Route path="/recipe/ingredients/:recipeName" element={<GetRecipeIngredients />} />
            </Routes>
        </main>
    );
}
