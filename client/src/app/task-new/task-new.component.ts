import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.css']
})
export class TaskNewComponent implements OnInit {

  newTask: any;
  data: any;
  error: boolean = false;

  constructor(private _taskService: TaskService) {
  }

  ngOnInit() {
    this.newTask = {task: "", isComplete: false};
  }

  createTask(){
    this._taskService.addTask(this.newTask, () => {
      this.newTask = {task: "", isComplete: false};
    });
  }

  createTaskTwo() {
    let create = this._taskService.createTask(this.newTask);
    create.subscribe(data => {
      console.log(data);
      this.data = data;
      if (this.data.error) {
        this.error = true;
      }
      else {
        this.error = false;
      }
    });
    this.newTask = {task: "", isComplete: false};
    this._taskService.getAllTasks();
  }

}