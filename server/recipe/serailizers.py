from rest_framework import serializers
from .models import Recipe, RecipeIngredient, Ingredient

class recipeSerializer(serializers.ModelSerializer):
    # Fields for easier identification
    class Meta:
        model = Recipe
        fields = ["name", "description", "portion_size", "id", "instructions"]  # 'id' remains for unique identification

class recipeIngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = RecipeIngredient
        fields = ["recipe", "ingredient", "amount", "id"]  # Including the names for easier identification
        
class getRecipeIngredientSerializer(serializers.ModelSerializer):
    recipeName = serializers.CharField(source="recipe.name", read_only=True)
    ingredient=serializers.CharField(source="ingredient.name", read_only=True)
    
    
    class Meta:
        model = RecipeIngredient
        fields = ["recipeName", "ingredient", "amount", "id"]  # Including the names for easier identification
        
class RecipeIngredientUpdateSerializer(serializers.ModelSerializer):
    recipe_name = serializers.CharField(source='recipe.name', read_only=True)
    ingredient_name = serializers.CharField(source='ingredient.name', read_only=True)
    ingredient = serializers.CharField(write_only=True)  # Allow ingredient name in request for updates

    class Meta:
        model = RecipeIngredient
        fields = ["recipe_name", "ingredient_name", "ingredient", "amount", "id"]

    def update(self, instance, validated_data):
        # If the ingredient field is passed, fetch the ingredient object by name
        ingredient_name = validated_data.pop('ingredient', None)
        if ingredient_name:
            ingredient = Ingredient.objects.filter(name__iexact=ingredient_name).first()
            if ingredient:
                instance.ingredient = ingredient
            else:
                raise serializers.ValidationError({'ingredient': 'Ingredient not found.'})
        
        # Update the other fields
        instance.amount = validated_data.get('amount', instance.amount)
        instance.save()
        return instance
