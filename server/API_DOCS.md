# API Docs

GET POST <code>api/ingredient/ingredient/</code>

POST
```json


{
    "name":"Bread"
}


```

GET
```json 
{
    "name":"Bread",
    "id":"100"
}
```
----
GET DELETE PUT <code>api/ingredient/ingredient/update/{primary_key}</code>

GET and PUT
```json
{
    "name": "Toast",
    "id": 3
}
```

DELETE
```json
{
    "message": "Ingredient deleted"
}
```
---
GET POST<code>/api/ingredient/info/</code>

GET
```json
{
        "name": {priamrt_key},
        "description": "Eggs are nice",
        "cost": "1.50/item",
        "comments": "Who dose not like eggs.",
        "id": 4
    }
```

POST
```json
{
        "name": {primary_key},
        "description": "Eggs are nice",
        "cost": "1.50/item",
        "comments": "Who dose not like eggs."
    }

```
---
GET DELETE PUT <code>/api/ingredient/info/update/{primary_key}</code>

GET
```json
{
    "name": 2,
    "description": "Eggs are nice",
    "cost": "1.50/item",
    "comments": "Who dose not like eggs.",
    "id": 4
}
```

DELETE
```json
{
    "message": "Ingredient info deleted"
}
```

UPDATE
```json
{
    "name": 2,
    "description": "Eggs are nice",
    "cost": "1.50/item",
    "comments": "Who dose not like eggs.",
    "id": 4
}

```

GET DELETE PUT <code>/api/recipe/recipes/update/{primary_key}</code>

GET
```json
{
    "name": "Noodles",
    "description": "Poor noodles into water and done.",
    "portion_size": "1/serving",
    "id": 2
}
```

DELETE
```json
{
    "message": "Recipe was deleted."
}
```

PUT
```json
{
    "name": "Noodles",
    "description": "Poor noodles into water and done.",
    "portion_size": "1/serving",
    "id": 2
}

```

GET POST <code>/api/recipe/recipes/</code>

GET
```json
{
    "name": "Noodles",
    "description": "Poor noodles into water and done.",
    "portion_size": "1/serving",
    "id": 2
}
```

POST
```json
{
    "name": "Noodles",
    "description": "Poor noodles into water and done.",
    "portion_size": "1/serving",
    "id": 2
}

```