from django.conf.urls import url, include
from tasks_app.views import Tasks, TaskDetails
import tasks_app.views as views

urlpatterns = [
    url(r'^tasks$', Tasks.as_view()),
    url(r'^tasks/(?P<id>\d+)$', TaskDetails.as_view()),
    url(r'^activetasks$', views.getActive),
    url(r'^completedtasks$', views.getCompleted)
]
