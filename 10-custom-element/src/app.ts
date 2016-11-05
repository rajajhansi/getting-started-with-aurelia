import {TodoCustomElement} from "./todo";

export class App {
  heading = 'Todos';
  todos: TodoCustomElement[] = [
    new TodoCustomElement(false, "Task 1"),
    new TodoCustomElement(true, "Task 2")
  ]
  todoDescription: string;
  styleString: string = 'text-decoration: line-through;';
  styleObject: any = {
    'text-decoration': 'line-through'
  };
  oddItemCase: string = "uppercase";
  oddItemColor: string = "red";
  oddItemStyle: string = "oblique";
  oddItemWeight: string = "bold";
  evenItemCase: string = "lowercase";
  evenItemColor: string = "green";
  evenItemStyle: string = "italic";
  evenItemWeight: string = "lighter";
  addTodo() {
    if(this.todoDescription) {
      this.todos.push(new TodoCustomElement(false, this.todoDescription));
      this.todoDescription = "";
    }
  }

  removeTodo(todo: TodoCustomElement) {
    let index = this.todos.indexOf(todo);
    if(index !== -1) {
      this.todos.splice(index, 1);
    } 
  }
}
