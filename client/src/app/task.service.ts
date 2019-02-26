import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http: HttpClient) {}

  tasks = [
    { "task": "Learn Django", "isComplete": true }, { "task": "Learn Angular", "isComplete": true }, 
    { "task": "???", "isComplete": false }, { "task": "Profit!", "isComplete": false }
  ];

  getTasks(cb){
    return cb(this.tasks);
  }

  addTask(task, cb){
    this.tasks.push(task);
    cb();
  }

  removeTask(task, cb){
    for(let i = 0; i < this.tasks.length; i++){
      if(this.tasks[i] == task){
        this.tasks.splice(i, 1);
        break;
      }
    }
    cb();
  }

  updateTask(task, update, cb){
    for(let i = 0; i < this.tasks.length; i++){
      if(this.tasks[i] == task){
        this.tasks[i] = update;
        break;
      }
    }
    cb();
  }

  getAllTasks() {
    return this._http.get("/tasks");
  }

  getAllActive() {
    return this._http.get("/activetasks");
  }

  getAllCompleted() {
    return this._http.get("/completedtasks");
  }

  createTask(task) {
    return this._http.post("/tasks", task);
  }

  deleteTask(task) {
    return this._http.delete("/tasks/" + task.id);
  }

  changeTask(task) {
    return this._http.put("/tasks/" + task.id, task);
  }
}