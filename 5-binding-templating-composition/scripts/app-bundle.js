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

define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <h1>${heading}</h1>\r\n  <form submit.trigger=\"addTodo()\">\r\n    <input type=\"text\" value.bind=\"todoDescription\">\r\n    <button type=\"submit\">Add Todo</button>\r\n  </form>\r\n\r\n  <ul>\r\n    <li repeat.for=\"t of todos\">\r\n      <compose view-model=\"todo\" view=\"todo-upper.html\" model.bind=\"t\"></compose>\r\n      <button click.trigger=\"removeTodo(t)\">Remove Todo</button>\r\n    </li>\r\n  </ul>\r\n</template>\r\n"; });
define('text!todo.html', ['module'], function(module) { module.exports = "<template>\r\n    <input type=\"checkbox\" checked.bind=\"done\">\r\n    <span css=\"text-decoration: ${done ? 'line-through' : ''}\">${description}</span>\r\n</template>"; });
define('text!todo-upper.html', ['module'], function(module) { module.exports = "<template>\r\n    <input type=\"checkbox\" checked.bind=\"done\">\r\n    <span css=\"text-decoration: ${done ? 'line-through' : ''}\">${description.toUpperCase() }</span>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map