import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import { Home } from "./Home/home"
import GetIngredients from "./ingredients/IngredientsRequest"
import UpdateIngredients from "./ingredients/updateIngredients"

export default function ROUTES() {

    return (
        <div>
            <BrowserRouter>
                <main>
                    <Routes> 

                        {/*Home Page*/}
                        <Route path="/" element = <Home/> />

                        {/*Ingredient app */}
                        <Route path="/ingredients/" element = <GetIngredients/> /> {/* Ingredients Page: Add and View */}
                        <Route path="/ingredients/update/" element= <UpdateIngredients/> /> {/*Update ingredients page */}

                        


                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    )
}