var TodoApp;

TodoApp = angular.module("TodoApp", ["ngRoute"]);

TodoApp.config([
  "$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      templateUrl: "spa.html",
      controller: "TodosCtrl"
    }).otherwise({
      redirectTo: "/"
    });
    return $locationProvider.html5Mode(true).hashPrefix("#");
  }
]);

TodoApp.controller("TodosCtrl", [
  "$scope", "$http", function($scope, $http) {
    $scope.todos = [];
    $scope.fadetask = true;
    $scope.notice = "Edit";
    $scope.getTodos = function() {
      console.log("getTodos")
      return $http.get("/api/tasks").success(function(data) {
        console.log("inside getTodos", data)
        var i, _i, _j, _len, _len1, _ref, _ref1, _results;
        $scope.todos = data;
        _ref = $scope.todos;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          $scope["completecheckbox" + i.id] = false;
        }
        _ref1 = $scope.todos;
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          i = _ref1[_j];
          if (i.complete === 1) {
            _results.push($scope["completecheckbox" + i.id] = true);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
    };
    $scope.getTodos();
    $scope.addTodo = function() {
      console.log("hooba", $scope.newTodo);
      return $http.post("/api/tasks", $scope.newTodo).success(function(data) {
        $scope.newTodo = {};
        return $scope.todos.push(data);
      });
    };
    $scope.deleteTodo = function(task) {
      var conf;
      conf = confirm("Delete this task?");
      if (conf) {
        return $http["delete"]("/api/tasks/" + task.id).success(function(data) {
          return $scope.todos.splice($scope.todos.indexOf(task), 1);
        });
      }
    };
    $scope.editTodo = function(task) {
      this.checked = false;
      this.notice = "Edit";
      return $http.put("/api/tasks/" + task.id, task).success(function(data) {});
    };
    $scope.checkButton = function() {
      if (this.checked === true) {
        console.log("true");
        this.checked = false;
        return this.notice = "Edit";
      } else {
        console.log("setting true");
        this.notice = "Close";
        return this.checked = true;
      }
    };
    $scope.editButton = function() {
      if (this.checked === true) {
        console.log("true");
        this.checked = false;
        return this.notice = "Edit";
      } else {
        console.log("setting true");
        this.checked = true;
        this.notice = "Close";
        return this.fadetask = false;
      }
    };
    return $scope.completeTodo = function(task) {
      var conf;
      console.log(task);
      if (task.complete !== 1) {
        task.complete = 1;
        conf = confirm("Complete this task?");
        if (conf) {
          $scope["completecheckbox" + task.id] = true;
          return $http.put("/api/tasks/" + task.id, task).success(function(data) {});
        }
      }
    };
  }
]);

TodoApp.config([
  "$httpProvider", function($httpProvider) {
    return $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
]);
