from rest_framework import serializers
from .models import Ingrediant, IngrediantInfo

class IngrediantSerilizer(serializers.Serializer):
    class Meta:
        model = Ingrediant
        fields = ["name"]