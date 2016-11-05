var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('todo',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var TodoCustomElement = (function () {
        function TodoCustomElement(done, description) {
            this.done = done;
            this.description = description;
        }
        TodoCustomElement.prototype.activate = function (model) {
            this.done = model.done;
            this.description = model.description;
        };
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Boolean)
        ], TodoCustomElement.prototype, "done", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', String)
        ], TodoCustomElement.prototype, "description", void 0);
        TodoCustomElement = __decorate([
            aurelia_framework_1.customElement("raja-todo"), 
            __metadata('design:paramtypes', [Boolean, String])
        ], TodoCustomElement);
        return TodoCustomElement;
    }());
    exports.TodoCustomElement = TodoCustomElement;
});

define('app',["require", "exports", "./todo"], function (require, exports, todo_1) {
    "use strict";
    var App = (function () {
        function App() {
            this.heading = 'Todos';
            this.todos = [
                new todo_1.TodoCustomElement(false, "Task 1"),
                new todo_1.TodoCustomElement(true, "Task 2")
            ];
            this.styleString = 'text-decoration: line-through;';
            this.styleObject = {
                'text-decoration': 'line-through'
            };
            this.oddItemCase = "uppercase";
            this.oddItemColor = "red";
            this.oddItemStyle = "oblique";
            this.oddItemWeight = "bold";
            this.evenItemCase = "lowercase";
            this.evenItemColor = "green";
            this.evenItemStyle = "italic";
            this.evenItemWeight = "lighter";
        }
        App.prototype.addTodo = function () {
            if (this.todoDescription) {
                this.todos.push(new todo_1.TodoCustomElement(false, this.todoDescription));
                this.todoDescription = "";
            }
        };
        App.prototype.removeTodo = function (todo) {
            var index = this.todos.indexOf(todo);
            if (index !== -1) {
                this.todos.splice(index, 1);
            }
        };
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
        config.globalResources([
            "./attributes/case",
            "./attributes/case-color",
            "./attributes/upper-case",
            "./attributes/dynamic-style",
            "./elements/todo-hoce.html"
        ]);
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/attributes/case-color',["require", "exports", 'aurelia-framework'], function (require, exports, aurelia_framework_1) {
    "use strict";
    var CaseColorCustomAttribute = (function () {
        function CaseColorCustomAttribute(element) {
            this.element = element;
        }
        CaseColorCustomAttribute.prototype.caseChanged = function (newCase, oldCase) {
            this.element.style.textTransform = newCase;
        };
        CaseColorCustomAttribute.prototype.colorChanged = function (newColor, oldColor) {
            this.element.style.color = newColor;
        };
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', String)
        ], CaseColorCustomAttribute.prototype, "case", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', String)
        ], CaseColorCustomAttribute.prototype, "color", void 0);
        CaseColorCustomAttribute = __decorate([
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [Element])
        ], CaseColorCustomAttribute);
        return CaseColorCustomAttribute;
    }());
    exports.CaseColorCustomAttribute = CaseColorCustomAttribute;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/attributes/case',["require", "exports", 'aurelia-framework'], function (require, exports, aurelia_framework_1) {
    "use strict";
    var CaseCustomAttribute = (function () {
        function CaseCustomAttribute(element) {
            this.element = element;
        }
        CaseCustomAttribute.prototype.valueChanged = function (newValue, oldValue) {
            this.element.style.textTransform = newValue;
        };
        CaseCustomAttribute = __decorate([
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [Element])
        ], CaseCustomAttribute);
        return CaseCustomAttribute;
    }());
    exports.CaseCustomAttribute = CaseCustomAttribute;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/attributes/dynamic-style',["require", "exports", 'aurelia-framework'], function (require, exports, aurelia_framework_1) {
    "use strict";
    var DynamicStyleCustomAttribute = (function () {
        function DynamicStyleCustomAttribute(element) {
            this.element = element;
        }
        DynamicStyleCustomAttribute.prototype.propertyChanged = function (name, newValue, oldValue) {
            switch (name) {
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
                    this.element.style[("" + name)] = newValue;
                    break;
            }
        };
        DynamicStyleCustomAttribute = __decorate([
            aurelia_framework_1.dynamicOptions,
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [Element])
        ], DynamicStyleCustomAttribute);
        return DynamicStyleCustomAttribute;
    }());
    exports.DynamicStyleCustomAttribute = DynamicStyleCustomAttribute;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/attributes/upper-case',["require", "exports", 'aurelia-framework'], function (require, exports, aurelia_framework_1) {
    "use strict";
    var UpperCaseCustomAttribute = (function () {
        function UpperCaseCustomAttribute(element) {
            this.element = element;
            this.element.style.textTransform = "uppercase";
        }
        UpperCaseCustomAttribute.prototype.valueChanged = function (newValue, oldValue) {
        };
        UpperCaseCustomAttribute = __decorate([
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [Element])
        ], UpperCaseCustomAttribute);
        return UpperCaseCustomAttribute;
    }());
    exports.UpperCaseCustomAttribute = UpperCaseCustomAttribute;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./todo\"></require>\r\n  <h1 upper-case>${heading}</h1>\r\n  <form submit.trigger=\"addTodo()\">\r\n    <input type=\"text\" value.bind=\"todoDescription\">\r\n    <button type=\"submit\">Add Todo</button>\r\n  </form>\r\n\r\n  <ul>\r\n    <li repeat.for=\"t of todos\">\r\n      <raja-todo done.bind=\"t.done\" description.bind=\"t.description\"></raja-todo>\r\n      <!--<compose if.bind=\"$odd\" view-model=\"todo\" view=\"todo.html\" model.bind=\"t\" dynamic-style=\"case.bind: oddItemCase; color.bind: oddItemColor; style.bind: oddItemStyle; fontWeight.bind: oddItemWeight\"></compose>\r\n      <compose if.bind=\"$even\" view-model=\"todo\" view=\"todo.html\" model.bind=\"t\" dynamic-style=\"case.bind: evenItemCase; color.bind: evenItemColor; style.bind: evenItemStyle; fontWeight.bind: evenItemWeight\"></compose>-->\r\n      <button click.trigger=\"removeTodo(t)\">Remove Todo</button>\r\n    </li>\r\n  </ul>\r\n</template>\r\n"; });
define('text!todo-upper.html', ['module'], function(module) { module.exports = "<template>\r\n    <input type=\"checkbox\" checked.bind=\"done\">\r\n    <span css=\"text-decoration: ${done ? 'line-through' : ''}\">${description.toUpperCase() }</span>\r\n</template>"; });
define('text!todo.html', ['module'], function(module) { module.exports = "<template>\r\n    <input type=\"checkbox\" checked.bind=\"done\">\r\n    <span css=\"text-decoration: ${done ? 'line-through' : ''}\">${description}</span>\r\n</template>"; });
define('text!resources/elements/todo-hoce.html', ['module'], function(module) { module.exports = "<template bindable=\"done, description\">\n <input type=\"checkbox\" checked.bind=\"done\">\n <span css=\"text-decoration: ${done ? 'line-through' : ''}\">${description}</span>\n</template>"; });
//# sourceMappingURL=app-bundle.js.map