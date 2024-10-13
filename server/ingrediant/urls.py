from django.urls import path
from .views import getAdd, removeUpdate

urlpatterns = [
    path("", getAdd),
    path("update/<pk>", removeUpdate)
    
]
