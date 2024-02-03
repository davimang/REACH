#create venv - you will need to activate it after making it
venv:
	python -m venv venv

#*only run after creating and activating venv. The above target (venv) only creates it.
install:
	pip install -r requirements.txt

run:
	python manage.py runserver

#run api in docker. *must have docker-compose installed, although most likely will come with docker installation
up:
	docker-compose up -d --build

#david helpers - these are just things that I find helpful based on my setup (might be helpful for u too)
devenv:
	py -3.11 -m venv venv

#gcloud only supports up to python 3.10
cloudenv:
	py -3.10 -m venv cloudenv

# lint
lint-api:
	pylint --rcfile=.pylintrc Api && black Api

#make migration files
migrations:
	python manage.py makemigrations

#migrate changes to the db
migrate: 
	python manage.py migrate

#create super user
super:
	python manage.py createsuperuser