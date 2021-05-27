import { Task } from './../../Task';
import { TasksService } from './../../services/tasks.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTaskItem(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {this.tasks = this.tasks.filter((t) => t.id !== task.id)});
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addNewTask(task: Task) {
    this.taskService.addNewTask(task).subscribe((task) => {this.tasks.push(task)});
  }

}
