"use strict";
/*global localStorage: false, console: false, window: false */

angular.module("snnotebook", ["ngRoute"]).config([
  "$routeProvider",
  function config($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "templates/app.template.html"
      })
      .when("/about", {
        templateUrl: "templates/about-page.template.html"
      })
      .when("/note-form", {
        templateUrl: "templates/note-form.template.html",
        controller: "noteFormController"
      })
      .otherwise({
        templateUrl: "templates/page404.template.html"
      });
  }
]);
/*
  .directive("customTouch", [
    "$interval",
    function($interval) {
      return {
        link: function($scope, element) {
          let delay,
            time = 0;
          element.on("touchstart", function() {
            const id = $scope.$index;
            const DELAY_IN_MS = 200;
            delay = $interval(function() {
              time += DELAY_IN_MS;
              if (time >= 2000) {
                $interval.cancel(delay);
                $scope.$parent.$ctrl.editNote(id);
              }
            }, DELAY_IN_MS);
          });
          element.on("touchend", function() {
            $interval.cancel(delay);
          });
        }
      };
    }
  ]);*/
