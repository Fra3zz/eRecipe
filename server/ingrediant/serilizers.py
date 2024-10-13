from rest_framework import serializers
from .models import Ingredient, IngredientInfo

class IngredientSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ["name"]