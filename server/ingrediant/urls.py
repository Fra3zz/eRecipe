from django.urls import path
from .views import getIngrediant

urlpatterns = [
    path("get/", getIngrediant)
]
