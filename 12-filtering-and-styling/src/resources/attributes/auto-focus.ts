import {customAttribute, autoinject, bindingMode, TaskQueue} from 'aurelia-framework';

@customAttribute('auto-focus', bindingMode.twoWay)
@autoinject()
export class AutoFocusCustomAttribute {

  constructor(private element: Element, private taskQueue: TaskQueue) { }

  giveFocus() {
    this.taskQueue.queueMicroTask( () => {
        (<HTMLElement>this.element).focus();     
    })
  }
  
  attached() {
    this.giveFocus();
  }
}
