from django.urls import path
from .views import getAdd, removeUpdate, ingredientInfoGetAddView, ingredientInfoUpdateView

urlpatterns = [
    #Ingredients Model API Endpoints
    path("ingredients/", getAdd),
    path("ingredients/<int:pk>", removeUpdate),
    
    #IngredientsInfo Model API Endpoints
    path("info", ingredientInfoGetAddView),
    path("info/<int:pk>", ingredientInfoUpdateView)
]
