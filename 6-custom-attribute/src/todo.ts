export class Todo {
    constructor(private done: boolean, private description: string){}
    activate(model: Todo) {
        this.done = model.done;
        this.description = model.description;
    }
}