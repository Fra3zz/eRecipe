from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Recipe, RecipeIngredient
from .serilizers import recipeSerializer, recipeIngredientSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404

# Create your views here.


#Recipe views
@api_view(["GET", "POST"])
def getAddRecipeView(request):
    if request.method == "GET":
        recipes = Recipe.objects.all()
        serilizedRecipe = recipeSerializer(recipes, many=True)
        return Response(serilizedRecipe.data, status=status.HTTP_200_OK)
    if request.method == "POST":
        data = request.data
        serilizedData = recipeSerializer(data=data)
        if serilizedData.is_valid():
            serilizedData.save()
            return Response(serilizedData.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serilizedData.errors, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(["PUT", "DELETE", "PATCH", "GET"])
def updateRecipeView(request, pk):
    if request.method == "PUT" or request.method == "PATCH":
        try:
            recipe = Recipe.objects.get(pk=pk)
        except:
            return Response({"error": "Ingredient not found"}, status=status.HTTP_404_NOT_FOUND)
        newRecipeSerilized = recipeSerializer(recipe, data=request.data)
        if newRecipeSerilized.is_valid():
            newRecipeSerilized.save()
            return Response(newRecipeSerilized.data, status=status.HTTP_202_ACCEPTED)        
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == "GET":
        try:
            recipe = Recipe.objects.get(pk=pk)
        except:
            return Response({"error":"Recipe dose not exist."}, status=status.HTTP_404_NOT_FOUND)
        serilizedRecipe = recipeSerializer(recipe)
        return Response(serilizedRecipe.data, status=status.HTTP_200_OK)
    
    elif request.method == "DELETE":
        try:
            recipe = Recipe.objects.get(pk=pk)
        except:
            return Response({"error":"Recipe dose not exist."}, status=status.HTTP_404_NOT_FOUND)
        recipe.delete()
        return Response({"message":"Recipe was deleted."}, status=status.HTTP_200_OK)
    
#Recipe ingrediant views

@api_view(["GET", "POST"])
def getAddRecipeIngredientsView(request):
    if request.method == "GET":
        recipeIngredients = RecipeIngredient.objects.all()
        serializedRecipeIngredients = recipeIngredientSerializer(recipeIngredients, many=True)  # Add many=True
        return Response(serializedRecipeIngredients.data, status=status.HTTP_200_OK)
    elif request.method == "POST":
        data = request.data
        serializedData = recipeIngredientSerializer(data=data)
        if serializedData.is_valid():
            serializedData.save()
            return Response(serializedData.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
@api_view(["GET", "DELETE", "PUT", "PATCH"])
def updateRecipeIngredientView(request, pk):
    recipeIngredient = RecipeIngredient.objects.get(pk=pk)

    if request.method == "GET":
        serializedRecipeIngredient = recipeIngredientSerializer(recipeIngredient)
        return Response(serializedRecipeIngredient.data, status=status.HTTP_200_OK)

    elif request.method == "DELETE":
        recipeIngredient.delete()
        return Response({"message":"Ingrediant removed from recipe"}, status=status.HTTP_204_NO_CONTENT)

    elif request.method == "PUT":
        data = request.data
        serializedData = recipeIngredientSerializer(recipeIngredient, data=data)
        if serializedData.is_valid():
            serializedData.save()
            return Response(serializedData.data, status=status.HTTP_200_OK)
        else:
            return Response(serializedData.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "PATCH":
        data = request.data
        serializedData = recipeIngredientSerializer(recipeIngredient, data=data, partial=True)
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
    serializedRecipeIngredients = recipeIngredientSerializer(recipeIngredients, many=True)
    
    # Return the serialized data
    return Response(serializedRecipeIngredients.data, status=status.HTTP_200_OK)
