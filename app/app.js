"use strict";
/*global localStorage: false, console: false, window: false */

angular
  .module("snnotebook", ["ngRoute"])
  .config([
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
  ])
  .controller("appCtrl", function appCtrl(
    $scope,
    $window,
    manageNote,
    localStore
  ) {
    $scope.notes = [];
    $scope.note = { id: null, text: "" };
    $scope.showDeleteWarning = false;
    $scope.deleteID = null;

    const newNotes = localStore.getAllNotes();
    if (newNotes !== undefined) $scope.notes = [...newNotes];

    $scope.addNote = function addNote(text) {
      manageNote.addNote(text, $scope);
      localStore.save($scope.notes);
    };
    $scope.editNote = function editNote(id) {
      $scope.note.text = this.notes[id].note;
      $scope.note.id = id;
      $window.location.href = "/#!note-form";
    };
    $scope.clickDeleteBtn = function clickDeleteBtn(id) {
      $scope.showDeleteWarning = true;
      $scope.deleteID = id;
    };
    $scope.cancelBtn = function cancelBtn() {
      $scope.showDeleteWarning = false;
      $scope.deleteID = null;
    };
    $scope.deleteNote = function deleteNote() {
      manageNote.deleteNote($scope.deleteID, $scope);
      $scope.showDeleteWarning = false;
      $scope.deleteID = null;
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
