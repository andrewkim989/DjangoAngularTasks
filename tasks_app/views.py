from django.http import JsonResponse
from django.views import View
import json

from .models import Task

class Tasks(View):
    def get(self, request):
        return JsonResponse({"status": "ok", "tasks": list(Task.objects.values().all() ) })

    def post(self, request): 
        data = json.loads(request.body.decode())
        print(data)
        if (len(data["task"]) < 5):
            return JsonResponse({"error": "Task must be at least 5 characters long"})
        else:
            Task.objects.create(task = data["task"], isComplete = data["isComplete"])
            return JsonResponse({"status": "ok"})
 
class TaskDetails(View):
    def get(self, request, id):
        task = Task.objects.filter(id = id).values()[0]
        return JsonResponse({"status": "ok", "task": task})

    def put(self, request, id):
        task = Task.objects.get(id = id)

        data = json.loads(request.body.decode())
        print(data)
        task.task = data["task"]
        task.isComplete = data["isComplete"]
        task.save()
        return JsonResponse({"status": "ok"})
        
    def delete(self, request, id):
        task = Task.objects.get(id = id)
        task.delete()
        return JsonResponse({"status": "ok"})

def getActive(self):
    a = list(Task.objects.filter(isComplete = False).values())
    return JsonResponse({"status": "ok", "tasks": a })

def getCompleted(self):
    c = list(Task.objects.filter(isComplete = True).values())
    return JsonResponse({"status": "ok", "tasks": c })