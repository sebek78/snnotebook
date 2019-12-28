"use strict";

angular.module("snnotebook").service("manageNote", function() {
  this.addNote = function(text, $scope) {
    if ($scope.note.id !== null) {
      $scope.notes[$scope.note.id].note = text;
      $scope.note = { id: null, text: "" };
    } else {
      $scope.notes.push({ note: text });
    }
  };
  this.deleteNote = function(id, $scope) {
    $scope.notes.splice(id, 1);
  };
});
