"use strict";

// Declare app level module which depends on views, and core components
angular
  .module("snnotebook", ["noteForm", "header", "noteList"])
  .controller("appCtrl", function appCtrl($scope) {
    $scope.notes = [];

    $scope.addNote = function addNote(text) {
      let newNote = { note: text };
      this.notes.push(newNote);
    };
  });
