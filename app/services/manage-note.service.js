"use strict";

angular.module("snnotebook").service("manageNote", function() {
  this.addNote = function(newText, newDate, blueIcon, $scope) {
    if ($scope.note.id !== null) {
      $scope.notes[$scope.note.id].text = newText;
      $scope.notes[$scope.note.id].date = newDate;
      $scope.notes[$scope.note.id].blueIcon = blueIcon;
      $scope.note = { id: null, text: "", blueIcon: false };
    } else {
      $scope.notes.push({ text: newText, date: newDate, blueIcon });
    }
  };
  this.deleteNote = function(id, $scope) {
    $scope.notes.splice(id, 1);
  };
});
