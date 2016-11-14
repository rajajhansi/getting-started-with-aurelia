define('todo',["require", "exports"], function (require, exports) {
    "use strict";
    var Todo = (function () {
        function Todo(values) {
            if (values === void 0) { values = {}; }
            this.description = "";
            this.done = false;
            Object.assign(this, values);
        }
        return Todo;
    }());
    exports.Todo = Todo;
});

define('services/todo-service',["require", "exports"], function (require, exports) {
    "use strict";
    var TodoService = (function () {
        function TodoService() {
            this.lastId = 0;
            this.todos = [];
        }
        TodoService.prototype.getAllTodos = function () {
            return this.todos;
        };
        TodoService.prototype.getTodoById = function (id) {
            return this.todos.filter(function (todo) { return todo.id === id; }).pop();
        };
        TodoService.prototype.addTodo = function (todo) {
            if (!todo.id) {
                todo.id = ++this.lastId;
            }
            this.todos.push(todo);
            return this;
        };
        TodoService.prototype.deleteTodoById = function (id) {
            this.todos = this.todos.filter(function (todo) { return todo.id !== id; });
            return this;
        };
        TodoService.prototype.updateTodoById = function (id, values) {
            if (values === void 0) { values = {}; }
            var todo = this.getTodoById(id);
            if (!todo) {
                return null;
            }
            Object.assign(todo, values);
            return todo;
        };
        TodoService.prototype.toggleTodoDone = function (todo) {
            var updatedTodo = this.updateTodoById(todo.id, { done: !todo.done });
            return updatedTodo;
        };
        TodoService.prototype.filterTodos = function (filterCriteria) {
            switch (filterCriteria) {
                case "active":
                    return this.todos.filter(function (t) { return !t.done; });
                case "completed":
                    return this.todos.filter(function (t) { return t.done; });
                case "all":
                default:
                    return this.todos;
            }
        };
        TodoService.prototype.toggleAllTodos = function () {
            this.todos.forEach(function (t) { return t.done = !t.done; });
        };
        TodoService.prototype.completeAllTodos = function () {
            this.todos.forEach(function (t) { return t.done = true; });
        };
        TodoService.prototype.removeAllTodos = function () {
            this.todos.splice(0);
        };
        TodoService.prototype.removeDoneTodos = function () {
            this.todos = this.todos.filter(function (todo) { return !todo.done; });
        };
        return TodoService;
    }());
    exports.TodoService = TodoService;
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
define('app',["require", "exports", "./todo", "./services/todo-service", "aurelia-framework", "aurelia-binding"], function (require, exports, todo_1, todo_service_1, aurelia_framework_1, aurelia_binding_1) {
    "use strict";
    var App = (function () {
        function App(todoService, observerLocator) {
            this.todoService = todoService;
            this.observerLocator = observerLocator;
            this.heading = "Todos";
            this.todoDescription = "";
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
            this.activeFilter = "all";
            this.filterTodos(this.activeFilter);
        }
        App.prototype.getTodosCount = function (filter) {
            return this.todoService.filterTodos(filter).length;
        };
        Object.defineProperty(App.prototype, "allTodosCount", {
            get: function () {
                return this.getTodosCount("all");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(App.prototype, "activeTodosCount", {
            get: function () {
                return this.getTodosCount("active");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(App.prototype, "completedTodosCount", {
            get: function () {
                return this.getTodosCount("completed");
            },
            enumerable: true,
            configurable: true
        });
        App.prototype.addTodo = function () {
            if (this.todoDescription) {
                var newTodoItem = new todo_1.Todo({ done: false, description: this.todoDescription });
                this.todoService.addTodo(newTodoItem);
                this.todoDescription = "";
            }
            this.filterTodos(this.activeFilter);
        };
        App.prototype.removeTodo = function (todo) {
            this.todoService.deleteTodoById(todo.id);
            this.filterTodos(this.activeFilter);
        };
        App.prototype.filterTodos = function (filterCriteria) {
            this.activeFilter = filterCriteria;
            this.filteredTodos = this.todoService.filterTodos(this.activeFilter);
        };
        App.prototype.checkIfAllTodosAreCompleted = function () {
            return this.filteredTodos.every(function (todo) { return todo.done; });
        };
        App.prototype.toggleAllTodos = function () {
            this.todoService.toggleAllTodos();
            this.filterTodos(this.activeFilter);
        };
        App.prototype.completeAllTodos = function () {
            this.todoService.completeAllTodos();
            this.checkIfAllTodosAreCompleted();
            this.filterTodos(this.activeFilter);
        };
        App.prototype.removeAllTodos = function () {
            this.todoService.removeAllTodos();
            this.filterTodos(this.activeFilter);
        };
        App.prototype.removeDoneTodos = function () {
            this.todoService.removeDoneTodos();
            this.filterTodos(this.activeFilter);
        };
        App = __decorate([
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [todo_service_1.TodoService, aurelia_binding_1.ObserverLocator])
        ], App);
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
            "./attributes/auto-focus",
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
define('resources/attributes/auto-focus',["require", "exports", 'aurelia-framework'], function (require, exports, aurelia_framework_1) {
    "use strict";
    var AutoFocusCustomAttribute = (function () {
        function AutoFocusCustomAttribute(element, taskQueue) {
            this.element = element;
            this.taskQueue = taskQueue;
        }
        AutoFocusCustomAttribute.prototype.giveFocus = function () {
            var _this = this;
            this.taskQueue.queueMicroTask(function () {
                _this.element.focus();
            });
        };
        AutoFocusCustomAttribute.prototype.attached = function () {
            this.giveFocus();
        };
        AutoFocusCustomAttribute = __decorate([
            aurelia_framework_1.customAttribute('auto-focus', aurelia_framework_1.bindingMode.twoWay),
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [Element, aurelia_framework_1.TaskQueue])
        ], AutoFocusCustomAttribute);
        return AutoFocusCustomAttribute;
    }());
    exports.AutoFocusCustomAttribute = AutoFocusCustomAttribute;
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

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/todo',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    var TodoCustomElement = (function () {
        function TodoCustomElement(done, description) {
            this.done = done;
            this.description = description;
        }
        TodoCustomElement.prototype.doneChanged = function (newDone, oldDone) {
            console.log("done changed to " + newDone);
        };
        TodoCustomElement.prototype.activate = function (model) {
            this.done = model.done;
            this.description = model.description;
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Boolean)
        ], TodoCustomElement.prototype, "done", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
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

define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./resources/elements/todo\"></require>\r\n  <div class=\"ui raised very padded text container segment\">\r\n    <h1 upper-case>${heading}</h1>\r\n    <div class=\"ui horizontal divider\">New Todo</div>\r\n    <form submit.trigger=\"addTodo()\" class=\"ui form\">\r\n      <div class=\"field\">\r\n      <input type=\"text\" value.bind=\"todoDescription\" auto-focus placeholder=\"what needs to be done?\">\r\n      </div>\r\n      <button type=\"submit\" disabled.bind=\"todoDescription === ''\" class=\"ui primary button\">\r\n        <i class=\"icon plus\"></i>Add </button>\r\n    </form>\r\n    <div class=\"ui horizontal divider\">Status</div>\r\n    <div class=\"ui three item menu\">\r\n      <a class.bind=\"activeFilter === 'all' ? 'active item' : 'item'\" click.trigger=\"filterTodos('all')\" >All</a>\r\n      <a class.bind=\"activeFilter === 'active' ? 'active item' : 'item'\" click.trigger=\"filterTodos('active')\">Active</a>\r\n      <a class.bind=\"activeFilter === 'completed' ? 'active item' : 'item'\" click.trigger=\"filterTodos('completed')\">Completed</a>\r\n    </div>\r\n  \r\n    <div class=\"ui floated right menu\" show.bind=\"allTodosCount > 0\">\r\n      <div class=\"ui right floated blue statistic\">\r\n        <div class=\"value\">\r\n          <i class=\"tasks icon\"></i>\r\n        </div>\r\n        <div class=\"label\">\r\n          <strong>${allTodosCount}</strong>${allTodosCount === 1 ? ' task ': ' tasks '} \r\n        </div>\r\n      </div>\r\n      <div class=\"ui right floated green statistic\">\r\n        <div class=\"value\">\r\n          <i class=\"tasks icon\"></i>\r\n        </div>\r\n        <div class=\"label\">\r\n          <strong>${activeTodosCount}</strong>${activeTodosCount === 1 ? ' task ': ' tasks '} left\r\n        </div>\r\n      </div>\r\n      <div class=\"ui right floated red statistic\">\r\n        <div class=\"value\">\r\n          <i class=\"tasks icon\"></i>\r\n        </div>\r\n        <div class=\"label\">\r\n          <strong>${completedTodosCount}</strong>${completedTodosCount === 1 ? ' task ': ' tasks '} completed\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <br/><br/>    \r\n    <div><br/><br/></div>\r\n    <div class=\"ui floated right menu\">\r\n      <button class=\"ui icon negative button\" disabled.bind=\"allTodosCount === 0\" click.trigger=\"removeAllTodos()\">\r\n        <i class=\"remove icon\"></i>\r\n        Remove All\r\n      </button>\r\n      <button class=\"ui icon negative button\" disabled.bind=\"completedTodosCount === 0\" click.trigger=\"removeDoneTodos()\">\r\n        <i class=\"remove icon\"></i>\r\n        Remove Completed\r\n      </button>\r\n      <button class=\"ui icon blue button\" disabled.bind=\"allTodosCount === 0\" click.trigger=\"toggleAllTodos()\">\r\n        <i class=\"toggle on icon\"></i>\r\n        Toggle All\r\n      </button>\r\n      <button class=\"ui icon positive button\" disabled.bind=\"allTodosCount === 0\" click.trigger=\"completeAllTodos()\">\r\n        <i class=\"right checkmark icon\"></i>\r\n        Complete All\r\n      </button>\r\n    </div>\r\n    <div>\r\n      <br/><br/>\r\n      <div class=\"ui relaxed divided list\">\r\n        <div class=\"item\" repeat.for=\"t of filteredTodos\">\r\n          <raja-todo done.bind=\"t.done\" description.bind=\"t.description\"></raja-todo>\r\n          <!--<compose if.bind=\"$odd\" view-model=\"todo\" view=\"todo.html\" model.bind=\"t\" dynamic-style=\"case.bind: oddItemCase; color.bind: oddItemColor; style.bind: oddItemStyle; fontWeight.bind: oddItemWeight\"></compose>\r\n          <compose if.bind=\"$even\" view-model=\"todo\" view=\"todo.html\" model.bind=\"t\" dynamic-style=\"case.bind: evenItemCase; color.bind: evenItemColor; style.bind: evenItemStyle; fontWeight.bind: evenItemWeight\"></compose>-->\r\n          <span class=\"ui floated right menu middle aligned\">\r\n          <button click.trigger=\"removeTodo(t)\" class=\"ui primary button negative\">\r\n            <i class=\"icon remove\"></i>Remove \r\n          </button>\r\n          </span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n"; });
define('text!todo-upper.html', ['module'], function(module) { module.exports = "<template>\r\n    <input type=\"checkbox\" checked.bind=\"done\">\r\n    <span css=\"text-decoration: ${done ? 'line-through' : ''}\">${description.toUpperCase() }</span>\r\n</template>"; });
define('text!resources/elements/todo-hoce.html', ['module'], function(module) { module.exports = "<template bindable=\"done, description\">\n <input type=\"checkbox\" checked.bind=\"done\">\n <span css=\"text-decoration: ${done ? 'line-through' : ''}\">${description}</span>\n</template>"; });
define('text!resources/elements/todo.html', ['module'], function(module) { module.exports = "<template>\r\n    <i class=\"large tasks middle aligned icon\"></i>\r\n    <div class=\"ui toggle checkbox\">\r\n    <input type=\"checkbox\" checked.bind=\"done\">\r\n    <label><span css=\"text-decoration: ${done ? 'line-through' : ''}\">${description}</span></label>\r\n    </div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map