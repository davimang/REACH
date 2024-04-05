# REACH

Developer Names: David Moroniti, Deep Raj, Alan Scott, Anika Peer, Aamina Hussain

Date of project start: 09/18/2023

This project is a full-stack web application used to improve patients' access to clinical trials and practitioners' access to potential participants. The app is decomposed into two microservices - one for the frontend and one for the backend. The frontend microservice is implemented using React/TypeScript, and the backend service is implemented using Django/Django-Rest-Framework/Python. Both microservices are deployed on google cloud, using the google cloud run service; the database we are using to store patient information is deployed on google cloudSQL, and is a postgres database.

The folders and files for this project are as follows:

docs - Documentation for the project. The documentation contains detailed information accross the entire software development lifecycle, including a software requirements specification (/SRS), modulde decomposition/design (/design), testing plan (/VnVPlan), and testing report(VnVReport).

refs - Reference material used for the project.

src - The source code for the project. Organized based on the two microservices - /FE corresponds to the frontend microservice, and /backend corresponds to the backend microservice. Additionally, automated tests are included directly within the folders themselves, as opposed to the "test" folder.

workflows - Contains the CI pipeline for this project. Implemented using github actions, there is a simple ci pipeline for the backend (api.yml) service, which lints the code and runs the automated tests.

Makefiles can be found in both of the services detailing/providing help on how to run the services locally. If you have docker, running the services will be relatively straightforward - otherwise, your local environment will need to be setup to be able to run the services. Python 3.11 is recommened when running the API.
