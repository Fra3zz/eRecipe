from django.shortcuts import render
from .serilizers import IngredientSerilizer,IngredientInfoSerilizer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Ingredient, IngredientInfo
from rest_framework import status



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
            
#-----Ingredient Model views.

#Takes a request and returns DB object response or adds to DB object accordingly.
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
    

#Takes a request and returns an update or delete response object. Updated DB accordingly.    
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



#----Ingredient Comments----

@api_view(["GET", "POST"])
def ingredientInfoGetAddView(request):
    if request.method == "GET":
        ingredientInfoData = IngredientInfo.objects.all()
        serilizedData = IngredientInfoSerilizer(ingredientInfoData, many=True)
        return Response(serilizedData.data, status=status.HTTP_200_OK)
    elif request.method == "POST":
        data = request.data
        serilizedData = IngredientInfoSerilizer(data=data)
        if serilizedData.is_valid():
            serilizedData.save()
            return Response(serilizedData.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serilizedData.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
@api_view(["GET", "DELETE", "PUT", "PATCH"])
def ingredientInfoUpdateView(request, pk):
    if request.method == "GET":
        try:
            ingredientInfo = IngredientInfo.objects.get(pk=pk)
        except IngredientInfo.DoesNotExist:
            return Response({"error": "Ingredient info not found"}, status=status.HTTP_404_NOT_FOUND)
        serilizedIngredientInfo = IngredientInfoSerilizer(ingredientInfo)
        return Response(serilizedIngredientInfo.data, status=status.HTTP_200_OK)
    elif request.method =="DELETE":
        try :
            ingredientInfo = IngredientInfo.objects.get(pk=pk)
        except IngredientInfo.DoesNotExist:
            return Response({"error": "Ingredient info not found"}, status=status.HTTP_404_NOT_FOUND)
            
        serilizedIngredientInfo = IngredientInfoSerilizer(ingredientInfo)
        ingredientInfo.delete()
        return Response({"message": "Ingredient info deleted"}, status=status.HTTP_200_OK)
    elif (request.method == "PUT") or (request.method == "PATCH"):
        try:
            ingredientInfo = IngredientInfo.objects.get(pk=pk)
        except IngredientInfo.DoesNotExist:
            return Response({"error": "Ingredient info not found"}, status=status.HTTP_404_NOT_FOUND)

        if request.method == "PUT":
            # Full update (replace all fields)
            serializer = IngredientInfoSerilizer(ingredientInfo, data=request.data)
        else:
            # Partial update (modify only specific fields)
            serializer = IngredientSerilizer(ingredientInfo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        