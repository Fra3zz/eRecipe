from django.db import models

class Ingredient(models.Model):
    name = models.CharField(max_length=255, unique=True, null=False, blank=False)
    dateAdded = models.DateTimeField(auto_now_add=True, null=False)
    
    def __str__(self):
        return self.name    

class IngredientInfo(models.Model):
    name = models.OneToOneField(Ingredient, on_delete=models.CASCADE, null=False)
    description = models.CharField(max_length=500, null=True)
    cost = models.CharField(max_length=150, null=True)
    comments = models.CharField(max_length=400, null=False)
