from django.urls import path
from .views import getAdd, removeUpdate, ingredientInfoGetAddView, ingredientInfoUpdateView

urlpatterns = [
    #Ingredients Model API Endpoints
    path("", getAdd),
    path("<int:pk>", removeUpdate),
    
    #IngredientsInfo Model API Endpoints IN DEVELOPMENT
    #path("info", ingredientInfoGetAddView),
    #path("info/<int:pk>", ingredientInfoUpdateView)
]
