import {autoinject} from 'aurelia-framework';

@autoinject()
export class UpperCaseCustomAttribute {
  constructor(private element: Element) { 
    this.element.style.textTransform = "uppercase";
  }

  valueChanged(newValue, oldValue) {

  }
}

