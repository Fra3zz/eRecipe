# Use an official Python runtime as a parent image
FROM python:3.10-bullseye

# Set the working directory in the container
WORKDIR /app

# Install required system packages for mysqlclient
RUN apt-get update && \
    apt-get install -y gcc pkg-config libmariadb-dev && \
    rm -rf /var/lib/apt/lists/*

# Copy the requirements file to the container
COPY requirements.txt /app/

# Install the dependencies from the requirements file
RUN pip install --no-cache-dir -r requirements.txt

# Install Gunicorn (ensure it's listed in requirements.txt as well)
RUN pip install gunicorn

# Copy the current directory contents into the container
COPY ./ /app/

# Set environment variables for Django
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Ensure static files directory exists
RUN mkdir -p /app/staticfiles

# Collect static files
RUN python manage.py collectstatic --noinput || echo "Collectstatic failed, skipping..."

# Expose the port the app will run on
EXPOSE 8000

# Run migrations and start the Gunicorn server
CMD ["sh", "-c", "python manage.py makemigrations && python manage.py makemigrations recipe && python manage.py makemigrations ingrediant && python manage.py migrate && gunicorn server.wsgi:application --bind 0.0.0.0:8000"]
