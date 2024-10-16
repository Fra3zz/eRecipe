from rest_framework import serializers
from .models import Recipe, RecipeIngredient

class recipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ["name", "description", "portion_size", "id"]
        
class recipeIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeIngredient
        fields = ["recipe", "ingredient", "amount","id"]