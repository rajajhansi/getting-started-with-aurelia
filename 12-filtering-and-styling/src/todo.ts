export class Todo {
  id: number;
  description: string = "";
  done: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}