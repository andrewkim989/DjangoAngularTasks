import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(private _taskService: TaskService) { }

  tasks = [];
  mode = 'all';

  ngOnInit() {
    //this.getAll('');
    this.getEverything();
  }

  getAll(e){
    this.setActive(e);
    this.mode = 'all';
    this._taskService.getTasks( (data) => {
      this.tasks = data;
    });
  }

  getComplete(e){
    this.setActive(e);
    this.mode = 'complete';
    this._taskService.getTasks( (data) => {
      this.tasks = [];
      for(let task of data){
        if(task.isComplete){
          this.tasks.push(task);
        }
      }
    });
  }

  getActive(e){
    this.setActive(e);
    this.mode = 'active';
    this._taskService.getTasks( (data) => {
      this.tasks = [];
      for(let task of data){
        if(!task.isComplete){
          this.tasks.push(task);
        }
      }
    });
  }

  remove(task){
    this._taskService.removeTask(task, () => {
      if (this.mode == "all") {
        this.getAll('');
      }else if (this.mode == 'complete') {
        this.getComplete('');
      }else if (this.mode == 'active') {
        this.getActive('');
      }
    });
  }

  changeStatus(task){
    let update = task;
    update.isComplete = !task.isComplete;
    this._taskService.updateTask(task, update, () => {
      if (this.mode == "all") {
        this.getAll('');
      }else if (this.mode == 'complete') {
        this.getComplete('');
      }else if (this.mode == 'active') {
        this.getActive('');
      }
    });
  }

  setActive(e){
    if(e){
      let siblings = e.target.parentNode.parentNode.children;
      for(let sibling of siblings){
        sibling.classList.remove('is-active');
      }
      e.target.parentNode.classList.add('is-active');
    }
  }

  getEverything() {
    let all = this._taskService.getAllTasks();
    all.subscribe(data => {
      this.tasks = data["tasks"];
    })
  }

  getActiveTasks() {
    let a = this._taskService.getAllActive();
    a.subscribe(data => {
      this.tasks = data["tasks"];
    })
  }

  getCompletedTasks() {
    let c = this._taskService.getAllCompleted();
    c.subscribe(data => {
      this.tasks = data["tasks"];
    })
  }

  delete(task) {
    let deleted = this._taskService.deleteTask(task);
    deleted.subscribe(
      data => console.log("Data deleted", data));
    this.getEverything();
  }

  changeStatusTwo(task) {
    if (task.isComplete == false) {
      task.isComplete = true;
    }
    else {
      task.isComplete = false;
    }

    let t = this._taskService.changeTask({id: task.id, task: task.task, isComplete: task.isComplete});
    t.subscribe(data => {
      console.log(data);
    })
  }
}