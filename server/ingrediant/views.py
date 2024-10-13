from django.shortcuts import render
from .serilizers import IngredientSerilizer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Ingredient
from rest_framework import status
from rest_framework.parsers import JSONParser
import json



# Create your views here.

@api_view(['GET'])
def getIngrediant(request):
    if request.method == 'GET':
        ingredintData = Ingredient.objects.all()
        serilizedIngrediants = IngredientSerilizer(ingredintData).data
        return Response(serilizedIngrediants)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(["POST"])
def addIngrediant(request):
    serilizedData = IngredientSerilizer(data=request.data)
    if serilizedData.is_valid():
        serilizedData.save()
        return Response(serilizedData.data, status=status.HTTP_201_CREATED)
    return Response(serilizedData.errors, status=status.HTTP_400_BAD_REQUEST)
        