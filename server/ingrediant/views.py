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
        serilizedIngrediants = IngredientSerilizer(ingredintData, many=True).data
        return Response(serilizedIngrediants)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(["POST"])
def addIngrediant(request):
    serilizedData = IngredientSerilizer(data=request.data)
    if serilizedData.is_valid():
        serilizedData.save()
        return Response(serilizedData.data, status=status.HTTP_201_CREATED)
    return Response(serilizedData.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["DELETE"])
def removeIngredient(request, pk):
    try:
        ingredient = Ingredient.objects.get(pk=pk)
    except Ingredient.DoesNotExist:
        return Response({"error": "Ingredient not found"}, status=status.HTTP_404_NOT_FOUND)

    ingredient.delete()
    return Response({"message": "Ingredient deleted"}, status=status.HTTP_204_NO_CONTENT)

@api_view(["PUT", "PATCH"])
def updateIngrediant(request, pk):
    try:
        ingredient = Ingredient.objects.get(pk=pk)
    except Ingredient.DoesNotExist:
        return Response({"error": "Ingredient not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "PUT":
        # Full update (replace all fields)
        serializer = IngredientSerilizer(ingredient, data=request.data)
    else:
        # Partial update (modify only specific fields)
        serializer = IngredientSerilizer(ingredient, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            


@api_view(["GET", "POST"])
def getAdd(request):
    if request.method == 'GET':
        ingredintData = Ingredient.objects.all()
        serilizedIngrediants = IngredientSerilizer(ingredintData, many=True).data
        return Response(serilizedIngrediants)
    elif request.method == "POST":
        serilizedData = IngredientSerilizer(data=request.data)
        if serilizedData.is_valid():
            serilizedData.save()
            return Response(serilizedData.data, status=status.HTTP_201_CREATED)
        return Response(serilizedData.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["DELETE", "PUT", "PATCH", "GET"])
def removeUpdate(request, pk):
    if request.method == "DELETE":
        try:
            ingredient = Ingredient.objects.get(pk=pk)
        except Ingredient.DoesNotExist:
            return Response({"error": "Ingredient not found"}, status=status.HTTP_404_NOT_FOUND)
        ingredient.delete()
        return Response({"message": "Ingredient deleted"}, status=status.HTTP_204_NO_CONTENT)
    elif (request.method == "PUT") or (request.method == "PATCH"):
        try:
            ingredient = Ingredient.objects.get(pk=pk)
        except Ingredient.DoesNotExist:
            return Response({"error": "Ingredient not found"}, status=status.HTTP_404_NOT_FOUND)

        if request.method == "PUT":
            # Full update (replace all fields)
            serializer = IngredientSerilizer(ingredient, data=request.data)
        else:
            # Partial update (modify only specific fields)
            serializer = IngredientSerilizer(ingredient, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == "GET":
        try: ingrediant = Ingredient.objects.get(pk=pk)
        
        except Ingredient.DoesNotExist:
            return Response({"error": "Ingredient not found"}, status=status.HTTP_404_NOT_FOUND)
        serializedIngredient = IngredientSerilizer(ingrediant)
        return Response(serializedIngredient.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)