from django.urls import path
from .views import getAddRecipeView, updateRecipeView, getAddRecipeIngredientsView, updateRecipeIngredientView, getRecipeIngredientsByRecipeNameView

urlpatterns = [
    #Recipe Model API Endpoints
    path("recipes/", getAddRecipeView),
    path("recipes/<int:pk>/update", updateRecipeView),
    
    #RecipeIngredientInfo Model API Endpoints
    path("ingredients/", getAddRecipeIngredientsView),
    path("ingredients/<int:pk>/update", updateRecipeIngredientView),
    path("recipe/<str:recipe_name>/ingredients/", getRecipeIngredientsByRecipeNameView)
    
]
