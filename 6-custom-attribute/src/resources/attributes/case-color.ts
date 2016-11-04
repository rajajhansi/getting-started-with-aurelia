import {bindable, autoinject} from 'aurelia-framework';

@autoinject()
export class CaseColorCustomAttribute {
  @bindable case: string;
  @bindable color: string;
  constructor(private element: Element) { }

  caseChanged(newCase, oldCase) {
    this.element.style.textTransform = newCase;
  }

  colorChanged(newColor, oldColor) {
    this.element.style.color = newColor;
  }
}

