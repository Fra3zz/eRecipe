from django.urls import path
from .views import getAdd, removeUpdate, ingredientInfoGetAddView, ingredientInfoUpdateView

urlpatterns = [
    #Ingredients Model API Endpoints
    path("ingredient/", getAdd),
    path("ingredient/update/<int:pk>", removeUpdate),
    
    #INgredientsInfo Model API Endpoints
    path("info/", ingredientInfoGetAddView),
    path("info/update/<int:pk>", ingredientInfoUpdateView)
]
