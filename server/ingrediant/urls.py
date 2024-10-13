from django.urls import path
from .views import getAdd, removeUpdate, ingredientInfoGetAddView

urlpatterns = [
    #Ingredients Model API Endpoints
    path("ingredient/", getAdd),
    path("ingredient/update/<pk>", removeUpdate),
    
    #INgredientsInfo Model API Endpoints
    path("info/", ingredientInfoGetAddView)
    
]
