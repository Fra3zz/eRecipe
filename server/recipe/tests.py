from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .models import Recipe, Ingredient, RecipeIngredient

class RecipeAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()

        # Create ingredients
        self.ingredient1 = Ingredient.objects.create(name="Tomato")
        self.ingredient2 = Ingredient.objects.create(name="Cheese")
        
        # Create a recipe
        self.recipe = Recipe.objects.create(name="Pizza", description="Delicious pizza", portion_size="4 servings")
        
        # Create a RecipeIngredient
        self.recipe_ingredient = RecipeIngredient.objects.create(
            recipe=self.recipe, ingredient=self.ingredient1, amount="2 cups"
        )

    def test_get_all_recipes(self):
        url = reverse('get_add_recipe')  # Adjusted to match the new name
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), Recipe.objects.count())

    def test_create_recipe(self):
        url = reverse('get_add_recipe')
        data = {
            "name": "Pasta",
            "description": "Delicious pasta",
            "portion_size": "3 servings"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Recipe.objects.count(), 2)

    def test_update_recipe(self):
        url = reverse('update_recipe', kwargs={'recipe_name': 'Pizza'})  # Adjusted to match the new name
        data = {
            "name": "Updated Pizza",
            "description": "Updated description",
            "portion_size": "5 servings"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.recipe.refresh_from_db()
        self.assertEqual(self.recipe.name, "Updated Pizza")

    def test_delete_recipe(self):
        url = reverse('update_recipe', kwargs={'recipe_name': 'Pizza'})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Recipe.objects.filter(name="Pizza").exists())

    def test_get_recipe_ingredients(self):
        url = reverse('get_recipe_ingredients', kwargs={'recipe_name': 'Pizza'})  # Adjusted to match the new name
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), RecipeIngredient.objects.filter(recipe=self.recipe).count())

    def test_update_recipe_ingredient(self):
        url = reverse('update_recipe_ingredient', kwargs={'recipe_name': 'Pizza', 'ingredient_name': 'Tomato'})
        data = {
            "ingredient": "Cheese",  # Change the ingredient
            "amount": "3 cups"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.recipe_ingredient.refresh_from_db()
        self.assertEqual(self.recipe_ingredient.ingredient.name, "Cheese")
        self.assertEqual(self.recipe_ingredient.amount, "3 cups")

    def test_delete_recipe_ingredient(self):
        url = reverse('update_recipe_ingredient', kwargs={'recipe_name': 'Pizza', 'ingredient_name': 'Tomato'})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(RecipeIngredient.objects.filter(recipe=self.recipe, ingredient=self.ingredient1).exists())
