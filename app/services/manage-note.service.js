"use strict";

angular.module("snnotebook").service("manageNote", function() {
  this.addNote = function(newText, newDate, $scope) {
    if ($scope.note.id !== null) {
      $scope.notes[$scope.note.id].text = newText;
      $scope.notes[$scope.note.id].date = newDate;
      $scope.note = { id: null, text: "" };
    } else {
      $scope.notes.push({ text: newText, date: newDate });
    }
  };
  this.deleteNote = function(id, $scope) {
    $scope.notes.splice(id, 1);
  };
});
