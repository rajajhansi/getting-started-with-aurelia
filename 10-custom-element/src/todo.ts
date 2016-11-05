import {bindable, customElement} from "aurelia-framework";

@customElement("raja-todo")
export class TodoCustomElement {
    @bindable private done: boolean;
    @bindable private description: string;
    constructor(done: boolean, description: string){
        this.done = done;
        this.description = description;
    }
    activate(model: TodoCustomElement) {
        this.done = model.done;
        this.description = model.description;
    }
}