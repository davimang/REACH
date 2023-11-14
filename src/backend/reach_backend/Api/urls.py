from django.urls import path 
from Api import views 
  
urlpatterns = [ 
    path('trials/', 
         views.fetch_trials, 
         name = 'eligible-trials'),
] 