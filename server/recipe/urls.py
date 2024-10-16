from django.urls import path
from .views import getAddRecipeView, updateRecipeView, getAddRecipeIngredients

urlpatterns = [
    #Recipe Model API Endpoints
    path("recipes/", getAddRecipeView),
    path("recipes/update/<int:pk>", updateRecipeView),
    
    #RecipeIngredientInfo Model API Endpoints
    path("ingredients/", getAddRecipeIngredients)
]
