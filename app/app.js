"use strict";
/*global localStorage: false, console: false, window: false */

angular
  .module("snnotebook", [
    "ngRoute",
    "noteForm",
    "header",
    "noteList",
    "aboutPage"
  ])
  .config([
    "$routeProvider",
    function config($routeProvider) {
      $routeProvider
        .when("/", {
          templateUrl: "app.template.html"
        })
        .when("/about", {
          template: "<about-page></about-page>"
        })
        .when("/note-form", {
          template: "<note-form></note-form>"
        })
        .otherwise({
          templateUrl: "404.template.html"
        });
    }
  ])
  .controller("appCtrl", function appCtrl(
    $scope,
    $window,
    manageNote,
    localStore
  ) {
    $scope.notes = [];
    $scope.note = { id: null, text: "" };

    const newNotes = localStore.getAllNotes();
    if (newNotes !== undefined) $scope.notes = [...newNotes];

    $scope.addNote = function addNote(text) {
      manageNote.addNote(text, $scope);
      localStore.save($scope.notes);
    };
    $scope.editNote = function editNote(id) {
      this.note.text = this.notes[id].note;
      this.note.id = id;
      $window.location.href = "/#!note-form";
    };
    $scope.deleteNote = function deleteNote(id) {
      manageNote.deleteNote(id, $scope);
      localStore.save(this.notes);
    };
  })
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
  ]);
