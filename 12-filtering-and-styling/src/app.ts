import {Todo} from "./todo";
import {filterEnum, TodoService} from "./services/todo-service";
import {autoinject} from "aurelia-framework";
import {ObserverLocator} from "aurelia-binding";

@autoinject()
export class App {
  heading = "Todos";
  filteredTodos: Todo[];
  activeFilter: filterEnum;
  todoDescription: string = "";

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

  constructor(private todoService: TodoService, private observerLocator: ObserverLocator) {
    this.activeFilter = "all";
    this.filterTodos(this.activeFilter);
  }

  private getTodosCount(filter: filterEnum): number {
    return this.todoService.filterTodos(filter).length;
  }

  get allTodosCount(): number {
    return this.getTodosCount("all");
  }

  get activeTodosCount(): number {
    return this.getTodosCount("active");
  }

  get completedTodosCount(): number {
    return this.getTodosCount("completed");
  }

  addTodo() {
    if(this.todoDescription) {
      const newTodoItem = new Todo( {done: false, description: this.todoDescription});
      this.todoService.addTodo(newTodoItem);
      this.todoDescription = "";
    }
    this.filterTodos(this.activeFilter);
  }

  
  removeTodo(todo: Todo) {
    this.todoService.deleteTodoById(todo.id);
    this.filterTodos(this.activeFilter);
  }

  filterTodos(filterCriteria: filterEnum) {
    this.activeFilter = filterCriteria;
    this.filteredTodos =  this.todoService.filterTodos(this.activeFilter);
  }

  checkIfAllTodosAreCompleted() {
    return this.filteredTodos.every(todo => todo.done)
  }

  toggleAllTodos() {
    this.todoService.toggleAllTodos();
    this.filterTodos(this.activeFilter);
  }

  completeAllTodos() {
    this.todoService.completeAllTodos();
    this.checkIfAllTodosAreCompleted();
    this.filterTodos(this.activeFilter);
  }

  removeAllTodos() {
    this.todoService.removeAllTodos();
    this.filterTodos(this.activeFilter);
  }

  removeDoneTodos() {
    this.todoService.removeDoneTodos();
    this.filterTodos(this.activeFilter);
  }
}
