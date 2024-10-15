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
