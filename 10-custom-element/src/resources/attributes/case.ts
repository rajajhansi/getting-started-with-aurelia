import {autoinject} from 'aurelia-framework';

@autoinject()
export class CaseCustomAttribute {
  constructor(private element: Element) { }

  valueChanged(newValue, oldValue) {
    this.element.style.textTransform = newValue;
  }
}

