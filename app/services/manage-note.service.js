"use strict";

angular.module("snnotebook").service("manageNote", function() {
  this.addNote = function(newText, $scope) {
    if ($scope.note.id !== null) {
      $scope.notes[$scope.note.id].text = newText;
      $scope.note = { id: null, text: "" };
    } else {
      $scope.notes.push({ text: newText });
    }
  };
  this.deleteNote = function(id, $scope) {
    $scope.notes.splice(id, 1);
  };
});
