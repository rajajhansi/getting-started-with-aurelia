define('todo',["require", "exports"], function (require, exports) {
    "use strict";
    var Todo = (function () {
        function Todo(done, description) {
            this.done = done;
            this.description = description;
        }
        Todo.prototype.activate = function (model) {
            this.done = model.done;
            this.description = model.description;
        };
        return Todo;
    }());
    exports.Todo = Todo;
});

define('app',["require", "exports", "./todo"], function (require, exports, todo_1) {
    "use strict";
    var App = (function () {
        function App() {
            this.heading = 'Todos';
            this.todos = [
                new todo_1.Todo(false, "Task 1"),
                new todo_1.Todo(true, "Task 2")
            ];
            this.styleString = 'text-decoration: line-through;';
            this.styleObject = {
                'text-decoration': 'line-through'
            };
            this.oddItemCase = "uppercase";
            this.oddItemColor = "red";
            this.evenItemCase = "lowercase";
            this.evenItemColor = "green";
        }
        App.prototype.addTodo = function () {
            if (this.todoDescription) {
                this.todos.push(new todo_1.Todo(false, this.todoDescription));
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

define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./resources/attributes/upper-case\"></require>\r\n  <require from=\"./resources/attributes/case\"></require>\r\n  <h1 upper-case>${heading}</h1>\r\n  <form submit.trigger=\"addTodo()\">\r\n    <input type=\"text\" value.bind=\"todoDescription\">\r\n    <button type=\"submit\">Add Todo</button>\r\n  </form>\r\n\r\n  <ul>\r\n    <li repeat.for=\"t of todos\">\r\n      <compose view-model=\"todo\" view=\"todo.html\" model.bind=\"t\" case=\"${$odd ? 'uppercase' : 'lowercase'}\"></compose>\r\n      <button click.trigger=\"removeTodo(t)\">Remove Todo</button>\r\n    </li>\r\n  </ul>\r\n</template>\r\n"; });
define('text!todo-upper.html', ['module'], function(module) { module.exports = "<template>\r\n    <input type=\"checkbox\" checked.bind=\"done\">\r\n    <span css=\"text-decoration: ${done ? 'line-through' : ''}\">${description.toUpperCase() }</span>\r\n</template>"; });
define('text!todo.html', ['module'], function(module) { module.exports = "<template>\r\n    <input type=\"checkbox\" checked.bind=\"done\">\r\n    <span css=\"text-decoration: ${done ? 'line-through' : ''}\">${description}</span>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map