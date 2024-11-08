python manage.py makemigrations recipe
python manage.py makemigrations ingrediant
python manage.py migrate
sh -c python manage.py migrate && gunicorn server.wsgi:application --bind 0.0.0.0:8000