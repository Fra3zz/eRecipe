from django.urls import path
from .views import getAddRecipeView, updateRecipeView, getAddRecipeIngredientsView, updateRecipeIngredientView, getRecipeIngredientsByRecipeNameView

urlpatterns = [
    # Recipe Model API Endpoints
    path("", getAddRecipeView,name="get_add_recipe"),
    path("<str:recipe_name>", updateRecipeView, name="update_recipe"),
    
    # Recipe Ingredient Model API Endpoints
    path("ingredients", getAddRecipeIngredientsView, name="get_add_recipe_ingredients"), #Gets all ingredients for all recipes.
    path("ingredients/<str:recipe_name>", getRecipeIngredientsByRecipeNameView, name="get_recipe_ingredients"), #Gets the ingredients for a specific recipe.
    path("ingredients/<str:recipe_name>/<str:ingredient_name>", updateRecipeIngredientView,  name="update_recipe_ingredient"), #Update/Delete ingrediant of a specific recipe.
]
