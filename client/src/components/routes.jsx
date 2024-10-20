import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import { Home } from "./Home/home"
import GetIngredients from "./ingredient/IngredientsRequest"

export default function ROUTES() {

    return (
        <div>
            <BrowserRouter>
                <main>
                    <Routes> 
                        <Route path="/" element = <Home/> />    {/*Home Page*/}
                        <Route path="/ingredients" element = <GetIngredients/> /> {/* Ingredients Page: Add and View */}
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    )
}