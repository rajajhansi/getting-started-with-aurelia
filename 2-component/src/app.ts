import {Todo} from "./todo";

export class App {
  heading = 'Todos';
  todos: Todo[] = [
    new Todo(false, "Task 1"),
    new Todo(true, "Task 2")
  ]
}
