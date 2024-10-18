from django.urls import path
from .views import getAddRecipeView, updateRecipeView, getAddRecipeIngredientsView, updateRecipeIngredientView, getRecipeIngredientsByRecipeNameView

urlpatterns = [
    # Recipe Model API Endpoints
    path("recipes/", getAddRecipeView),
    path("recipes/<str:recipe_name>/update", updateRecipeView),
    
    # Recipe Ingredient Model API Endpoints
    path("ingredients/", getAddRecipeIngredientsView), #Gets all ingredients for all recipes.
    path("ingredients/<str:recipe_name>/<str:ingredient_name>", updateRecipeIngredientView), #Allows for specific selection of ingredient in recipe
    path("recipe/<str:recipe_name>/ingredients/", getRecipeIngredientsByRecipeNameView) #Gets the ingredients for a specific recipe.
]
