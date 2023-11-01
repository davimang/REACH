#create venv - you will need to activate it after making it
venv:
	python -m venv venv

#*only run after creating and activating venv. The above target (venv) only creates it.
install:
	pip install -r requirements.txt

#run api in docker. *must have docker-compose installed, although most likely will come with docker installation
run:
	docker-compose up