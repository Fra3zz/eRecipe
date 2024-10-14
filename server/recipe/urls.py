from django.urls import path
from .views import getAddRecipeView

urlpatterns = [
    path("recipes/", getAddRecipeView)
]
