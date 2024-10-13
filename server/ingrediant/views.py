from django.shortcuts import render
from .serilizers import IngrediantSerilizer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Ingrediant
from rest_framework import status



# Create your views here.

@api_view(['GET'])
def getIngrediant(request):
    if request.method == 'GET':
        ingredintData = Ingrediant.objects.all()
        serilizedIngrediants = IngrediantSerilizer(ingredintData).data
        return Response(serilizedIngrediants)
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)