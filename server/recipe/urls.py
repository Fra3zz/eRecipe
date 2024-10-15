from django.urls import path
from .views import getAddRecipeView, updateRecipeView

urlpatterns = [
    path("recipes/", getAddRecipeView),
    path("recipes/update/<int:pk>", updateRecipeView)
]
