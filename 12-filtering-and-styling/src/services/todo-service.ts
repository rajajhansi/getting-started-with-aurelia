import { Todo } from "../todo";
export type filterEnum = "all" | "active" | "completed";

export class TodoService {
  lastId: number = 0;
  todos: Todo[] = [];

  constructor() { }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  getTodoById(id: number): Todo {
    return this.todos.filter(todo => todo.id === id).pop();
  }

  addTodo(todo: Todo) : TodoService {
    if(!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  deleteTodoById(id: number) : TodoService {
    this.todos = this.todos.filter(todo => todo.id !== id);
    return this;
  }

  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if(!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  toggleTodoDone(todo: Todo): Todo {
    let updatedTodo = this.updateTodoById(todo.id, { done: !todo.done });
    return updatedTodo;
  }

  filterTodos(filterCriteria: filterEnum) : Todo[] {
    switch(filterCriteria) {
      case "active":
        return this.todos.filter((t: Todo) => !t.done);
      case "completed":
        return this.todos.filter((t: Todo) => t.done);
      case "all":
      default:
        return this.todos;
    }     
  }
  
  toggleAllTodos() {
    this.todos.forEach((t: Todo) => t.done = !t.done);
  }

  completeAllTodos() {
    this.todos.forEach((t: Todo) => t.done = true);
  }

  removeAllTodos() {
    this.todos.splice(0);
  }

  removeDoneTodos() {
    this.todos = this.todos.filter((todo: Todo) => !todo.done);
  }
}
