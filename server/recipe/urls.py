from django.urls import path
from .views import getAddRecipeView, updateRecipeView, getAddRecipeIngredientsView, updateRecipeIngredientView, getRecipeIngredientsByRecipeIdView

urlpatterns = [
    #Recipe Model API Endpoints
    path("recipes/", getAddRecipeView),
    path("recipes/update/<int:pk>", updateRecipeView),
    
    #RecipeIngredientInfo Model API Endpoints
    path("ingredients/", getAddRecipeIngredientsView),
    path("ingredients/update/<int:pk>", updateRecipeIngredientView),
    path("recipe/<int:recipe_id>/ingredients/", getRecipeIngredientsByRecipeIdView)
    
]
