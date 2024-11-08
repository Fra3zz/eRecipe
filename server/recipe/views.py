from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Recipe, RecipeIngredient, Ingredient
from .serailizers import recipeSerializer, recipeIngredientSerializer, RecipeIngredientUpdateSerializer, getRecipeIngredientSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404

# Recipe views
@api_view(["GET", "POST"])
def getAddRecipeView(request):
    if request.method == "GET":
        recipes = Recipe.objects.all()
        serializedRecipe = recipeSerializer(recipes, many=True)
        return Response(serializedRecipe.data, status=status.HTTP_200_OK)

    if request.method == "POST":
        data = request.data
        serializedData = recipeSerializer(data=data)
        if serializedData.is_valid():
            serializedData.save()
            return Response(serializedData.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "DELETE", "PATCH", "GET"])
def updateRecipeView(request, recipe_name):
    # Search for the recipe by name (case-insensitive)
    recipe = get_object_or_404(Recipe, name__iexact=recipe_name)

    if request.method in ["PUT", "PATCH"]:
        serializedRecipe = recipeSerializer(recipe, data=request.data, partial=(request.method == "PATCH"))
        if serializedRecipe.is_valid():
            serializedRecipe.save()
            return Response(serializedRecipe.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializedRecipe.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "GET":
        serializedRecipe = recipeSerializer(recipe)
        return Response(serializedRecipe.data, status=status.HTTP_200_OK)
    
    elif request.method == "DELETE":
        recipe.delete()
        return Response({"message": "Recipe was deleted."}, status=status.HTTP_200_OK)


# Recipe ingredient views
@api_view(["GET", "POST"])
def getAddRecipeIngredientsView(request):
    if request.method == "GET":
        recipeIngredients = RecipeIngredient.objects.all()
        serializedRecipeIngredients = recipeIngredientSerializer(recipeIngredients, many=True)
        return Response(serializedRecipeIngredients.data, status=status.HTTP_200_OK)

    elif request.method == "POST":
        data = request.data
        serializedData = recipeIngredientSerializer(data=data)
        if serializedData.is_valid():
            serializedData.save()
            return Response(serializedData.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "DELETE", "PUT", "PATCH"])
def updateRecipeIngredientView(request, recipe_name, ingredient_name):
    # Get the Recipe object by name (case-insensitive)
    recipe = get_object_or_404(Recipe, name__iexact=recipe_name)
    # Get the RecipeIngredient object by recipe and ingredient name
    recipeIngredient = get_object_or_404(RecipeIngredient, recipe=recipe, ingredient__name__iexact=ingredient_name)

    if request.method == "GET":
        serializedRecipeIngredient = recipeIngredientSerializer(recipeIngredient)
        return Response(serializedRecipeIngredient.data, status=status.HTTP_200_OK)

    elif request.method == "DELETE":
        recipeIngredient.delete()
        return Response({"message": "Ingredient removed from recipe"}, status=status.HTTP_204_NO_CONTENT)

    elif request.method == "PUT" or request.method == "PATCH":
        serializedData = RecipeIngredientUpdateSerializer(recipeIngredient, data=request.data, partial=(request.method == "PATCH"))
        if serializedData.is_valid():
            serializedData.save()
            return Response(serializedData.data, status=status.HTTP_200_OK)
        else:
            return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def getRecipeIngredientsByRecipeNameView(request, recipe_name):
    # Get the Recipe object by its name, case-insensitive search to avoid case mismatch issues
    recipe = get_object_or_404(Recipe, name__iexact=recipe_name)
    
    # Get all the RecipeIngredient objects related to the found recipe
    recipeIngredients = RecipeIngredient.objects.filter(recipe=recipe)
    
    # Serialize the RecipeIngredient objects
    serializedRecipeIngredients = getRecipeIngredientSerializer(recipeIngredients, many=True)
    
    # Return the serialized data
    return Response(serializedRecipeIngredients.data, status=status.HTTP_200_OK)
