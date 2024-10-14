from rest_framework import serializers
from .models import Recipe

class recipeSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ["name", "description", "portion_size", "id"]