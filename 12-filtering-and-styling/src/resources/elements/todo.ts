import {bindable, bindingMode, customElement} from "aurelia-framework";

@customElement("raja-todo")
export class TodoCustomElement {
    id: number;
    @bindable({ defaultBindingMode: bindingMode.twoWay })  done: boolean;
    @bindable({ defaultBindingMode: bindingMode.twoWay })  description: string;
    constructor(done: boolean, description: string){
        this.done = done;
        this.description = description;
    }
    doneChanged(newDone, oldDone) {
        console.log(`done changed to ${newDone}`);
    }
    activate(model: TodoCustomElement) {
        this.done = model.done;
        this.description = model.description;
    }
}