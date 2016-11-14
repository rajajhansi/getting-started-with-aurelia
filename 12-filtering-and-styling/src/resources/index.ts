import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    "./attributes/case",
    "./attributes/case-color",
    "./attributes/upper-case",
    "./attributes/dynamic-style",
    "./attributes/auto-focus",
    "./elements/todo-hoce.html"
  ]);
}
