from rest_framework import serializers
from .models import Ingredient, IngredientInfo


#Ingredient Model Serilizer
class IngredientSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ["name", "id"]
        
#IngredientInfos Model Serilizer
class IngredientInfoSerilizer(serializers.ModelSerializer):
    class Meta:
        model = IngredientInfo
        fields = ["name", "description", "cost", "comments", "id"]