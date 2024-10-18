from django.urls import path
from .views import getAddRecipeView, updateRecipeView, getAddRecipeIngredientsView, updateRecipeIngredientView, getRecipeIngredientsByRecipeNameView

urlpatterns = [
    # Recipe Model API Endpoints
    path("recipes", getAddRecipeView),
    path("recipes/<str:recipe_name>", updateRecipeView),
    
    # Recipe Ingredient Model API Endpoints
    path("ingredients", getAddRecipeIngredientsView), #Gets all ingredients for all recipes.
    path("ingredients/<str:recipe_name>", getRecipeIngredientsByRecipeNameView), #Gets the ingredients for a specific recipe.
    path("ingredients/<str:recipe_name>/<str:ingredient_name>", updateRecipeIngredientView), #Update/Delete ingrediant of a specific recipe.
]
