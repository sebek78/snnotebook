"use strict";
/*global localStorage: false, console: false, window: false */

angular.module("snnotebook", ["ngRoute", "ngMaterial", "ngMessages"]).config([
  "$routeProvider",
  "$mdThemingProvider",
  function config($routeProvider, $mdThemingProvider) {
    $mdThemingProvider.theme("default").dark();

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
