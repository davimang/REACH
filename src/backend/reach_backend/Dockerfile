
# The first instruction is what image we want to base our container on
# We Use an official Python runtime as a parent image
FROM python:3.11-slim

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first
ENV PYTHONUNBUFFERED 1

# create root directory for our project in the container
RUN mkdir /Api

# Set the working directory to /music_service
WORKDIR /Api

# Copy the current directory contents into the container at /Api
COPY . /Api/

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

CMD exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --threads 1 --timeout 0 reach_backend.wsgi:application