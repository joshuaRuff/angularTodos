import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    // Get Todos
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(todo => {
      // Overwrite ID to be unique
      todo.id = Date.now();
      this.todos.push(todo);
    });
  }

  deleteTodo(todo: Todo) {
    // Delete from the Server And then UI
    this.todoService.deleteTodo(todo).subscribe(response => {
      this.todos = this.todos.filter(t => t.id !== todo.id);
    });
  }
}
