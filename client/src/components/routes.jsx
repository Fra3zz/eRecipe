import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import { Home } from "./Home/home"
import GetIngredients from "./ingredients/IngredientsRequest"
import UpdateIngredients from "./ingredients/updateIngredients"
import GetRecipes from "./recipe/getAddRecipe"
import { AddRecipe } from "./recipe/getAddRecipe"
import AddIngredientToRecipe from "./recipe/AddIngredientToRecipe"

export default function ROUTES() {

    return (
        <div>
            <BrowserRouter>
                <main>
                    <Routes> 

                        {/*Home Page*/}
                        <Route path="/home/" element = <Home/> />

                        {/*Ingredient app */}
                        <Route path="/ingredients/" element = <GetIngredients/> /> {/* Ingredients Page: Add and View */}
                        <Route path="/ingredients/update/" element= <UpdateIngredients/> /> {/*Update ingredients page */}

                        {/*Recipe app */}
                        <Route path="/" element= <GetRecipes/> />
                        <Route path="/add/recipe/" element= <AddRecipe/> />
                        <Route path="/add/recipe/ingredient/" element= <AddIngredientToRecipe/> />

                        


                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    )
}