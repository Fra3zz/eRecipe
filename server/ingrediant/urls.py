from django.urls import path
from .views import getIngrediant, addIngrediant, removeIngredient, updateIngrediant

urlpatterns = [
    path("get/", getIngrediant),
    path("add/", addIngrediant),
    path("remove/<pk>", removeIngredient),
    path("update/<pk>", updateIngrediant)
]
