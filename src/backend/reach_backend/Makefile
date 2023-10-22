#create venv - you will need to activate it after making it
venv:
	python -m venv venv

#*only run after creating and activating venv. The above target (venv) only creates it.
install:
	pip install -r requirements.txt

#run django web server (will run on port 8000)
run:
	python manage.py runserver