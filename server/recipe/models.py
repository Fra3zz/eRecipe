from django.db import models

# Assuming you have an Ingredient model in the ingredients app
from ingrediant.models import Ingredient


class Recipe(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.CharField(help_text="Describe how to make the recipe.", max_length=150, null=True, blank=False)
    portion_size = models.CharField(max_length=100, help_text="Specify the portion size.")
    instructions = models.CharField(max_length=1500, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set the date and time when the recipe is created.

    def __str__(self):
        return self.name


class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='recipe_ingredients')
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE, related_name='ingredient_recipes')
    amount = models.CharField(max_length=50, help_text="Specify the amount for this ingredient (e.g., '2 cups').")

    class Meta:
        unique_together = ('recipe', 'ingredient')  # Ensure each ingredient is only listed once per recipe.

    def __str__(self):
        return f"{self.amount} of {self.ingredient.name} for {self.recipe.name}"
