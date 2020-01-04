"use strict";
/*global localStorage: false, console: false, window: false */

angular.module("snnotebook", ["ngRoute", "ngMaterial", "ngMessages"]).config([
  "$routeProvider",
  "$mdThemingProvider",
  "$mdDateLocaleProvider",
  function config($routeProvider, $mdThemingProvider, $mdDateLocaleProvider) {
    $mdThemingProvider.theme("default").dark();

    $mdDateLocaleProvider.formatDate = function(date) {
      const day = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      return day + "/" + (monthIndex + 1) + "/" + year;
    };

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
