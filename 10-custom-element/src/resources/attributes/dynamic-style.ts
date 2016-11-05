import {dynamicOptions, autoinject} from 'aurelia-framework';

@dynamicOptions
@autoinject()
export class DynamicStyleCustomAttribute {
  constructor(private element: Element) { }

  propertyChanged(name: string, newValue: string, oldValue: string) {
    switch(name) {
      case "case":
        this.element.style.textTransform = newValue;
        break;
      case "color":
        this.element.style.color = newValue;
        break;
      case "style":
        this.element.style.fontStyle = newValue;
        break;
      default:
        this.element.style[`${name}`] = newValue;
        break;
    }
  }
}

