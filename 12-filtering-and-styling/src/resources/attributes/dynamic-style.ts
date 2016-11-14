import {dynamicOptions, autoinject} from 'aurelia-framework';

@dynamicOptions
@autoinject()
export class DynamicStyleCustomAttribute {
  constructor(private element: Element) { }

  propertyChanged(name: string, newValue: string, oldValue: string) {
    switch(name) {
      case "case":
        (<HTMLElement>this.element).style.textTransform = newValue;
        break;
      case "color":
        (<HTMLElement>this.element).style.color = newValue;
        break;
      case "style":
        (<HTMLElement>this.element).style.fontStyle = newValue;
        break;
      default:
        (<HTMLElement>this.element).style[`${name}`] = newValue;
        break;
    }
  }
}

