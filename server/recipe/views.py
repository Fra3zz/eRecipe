from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Recipe
from .serilizers import recipeSerilizer
from rest_framework import status

# Create your views here.

@api_view(["GET", "POST"])
def getAddRecipeView(request):
    if request.method == "GET":
        recipes = Recipe.objects.all()
        serilizedRecipe = recipeSerilizer(recipes, many=True)
        return Response(serilizedRecipe.data, status=status.HTTP_200_OK)
    if request.method == "POST":
        data = request.data
        serilizedData = recipeSerilizer(data=data)
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
        newRecipeSerilized = recipeSerilizer(recipe, data=request.data)
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
        serilizedRecipe = recipeSerilizer(recipe)
        return Response(serilizedRecipe.data, status=status.HTTP_200_OK)
    
    elif request.method == "DELETE":
        try:
            recipe = Recipe.objects.get(pk=pk)
        except:
            return Response({"error":"Recipe dose not exist."}, status=status.HTTP_404_NOT_FOUND)
        recipe.delete()
        return Response({"message":"Recipe was deleted."}, status=status.HTTP_200_OK)
        