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
  .controller("appCtrl", function appCtrl($scope, $window) {
    const STORAGE_KEY = "snn-notes";

    $scope.getDataFromLocalStorage = function getDataFromLocalStorage() {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data !== null) {
        return data.split(";").map(string => JSON.parse(string));
      }
    };

    $scope.sendDataToLocalStorage = function sendDataToLocalStorage(notesCopy) {
      let processedNotes = notesCopy
        .map(obj => {
          delete obj.$$hashKey;
          return JSON.stringify(obj);
        })
        .join(";");
      localStorage.setItem(STORAGE_KEY, processedNotes);
    };

    $scope.notes = [];
    $scope.note = { edit: false, id: null, text: "" };

    const newNotes = $scope.getDataFromLocalStorage();
    if (newNotes !== undefined) $scope.notes = [...newNotes];

    $scope.addNote = function addNote(text) {
      //const newState = manageNote.addNote(text, $scope);
      //manageNote.addNote(text, $scope);
      //$scope.notes = newState.updatedNotes;
      //if (newState.updatedNote !== null) $scope.note = newState.updatedNote;
      let newNote = { note: text };
      if (this.note.edit) {
        this.notes[this.note.id] = newNote;
        this.note.edit = false;
        this.note.id = null;
        this.note.text = "";
      } else {
        this.notes.push(newNote);
      }
      this.sendDataToLocalStorage($scope.notes);
    };
    $scope.editNote = function editNote(id) {
      //const newState = manageNote(id, this.note.text, true);
      this.note.text = this.notes[id].note;
      this.note.edit = true;
      this.note.id = id;
      $window.location.href = "/#!note-form";
    };
    $scope.deleteNote = function deleteNote(id) {
      this.notes.splice(id, 1);
      if (this.notes.length === 0) {
        localStorage.clear();
      } else {
        this.sendDataToLocalStorage(this.notes);
      }
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
