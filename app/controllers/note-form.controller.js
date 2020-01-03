"use strict";

angular.module("snnotebook").controller("noteFormController", [
  "$scope",
  "$window",
  function noteFormController($scope, $window) {
    $scope.query = $scope.$parent.note.text || "";

    $scope.addNote = function addNote(text) {
      if (text !== undefined) {
        $scope.$parent.addNote(text);
        $scope.query = "";
        $window.location.href = "/#!/";
      }
    };
    $scope.backBtn = function backBtn() {
      $scope.$parent.note.text = "";
      $window.location.href = "/#!/";
    };
  }
]);
