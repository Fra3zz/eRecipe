from django.urls import path
from .views import getIngrediant, addIngrediant

urlpatterns = [
    path("get/", getIngrediant),
    path("add/", addIngrediant)
]
