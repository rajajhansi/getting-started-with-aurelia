import {Todo} from "./todo";

export class App {
  heading = 'Todos';
  todos: Todo[] = [
    new Todo(false, "Task 1"),
    new Todo(true, "Task 2")
  ]
  todoDescription: string;
  styleString: string = 'text-decoration: line-through;';
  styleObject: any = {
    'text-decoration': 'line-through'
  };
  oddItemCase: string = "uppercase";
  oddItemColor: string = "red";
  evenItemCase: string = "lowercase";
  evenItemColor: string = "green";
  addTodo() {
    if(this.todoDescription) {
      this.todos.push(new Todo(false, this.todoDescription));
      this.todoDescription = "";
    }
  }

  removeTodo(todo: Todo) {
    let index = this.todos.indexOf(todo);
    if(index !== -1) {
      this.todos.splice(index, 1);
    } 
  }
}
