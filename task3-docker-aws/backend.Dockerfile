# Use official Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy files
COPY flask-mongo-app/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY flask-mongo-app/ .

# Expose Flask port
EXPOSE 5000

# Run Flask
CMD ["python", "app.py"]
