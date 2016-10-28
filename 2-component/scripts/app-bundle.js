define('todo',["require", "exports"], function (require, exports) {
    "use strict";
    var Todo = (function () {
        function Todo(done, description) {
            this.done = done;
            this.description = description;
        }
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
        }
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

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${heading}</h1>\n  <ul>\n    <li repeat.for=\"t of todos\">\n      <input type=\"checkbox\" checked.bind=\"t.done\">\n      <span>${t.description}</span>\n    </li>\n  </ul>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map