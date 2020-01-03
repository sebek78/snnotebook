"use strict";

angular.module("snnotebook").controller("noteFormController", [
  "$scope",
  "$window",
  function noteFormController($scope, $window) {
    $scope.query = $scope.$parent.note.text || "";
    $scope.hideDeleteBtn = $scope.$parent.note.id === null ? true : false;

    $scope.addNote = function addNote(text) {
      if (text !== undefined) {
        $scope.$parent.addNote(text);
        $scope.query = "";
        $window.location.href = "/#!/";
      }
    };
    $scope.deleteBtn = function deleteBtn($event) {
      $scope.$parent.showConfirm($event, $scope.$parent.note.id);
    };
    $scope.backBtn = function backBtn() {
      $scope.$parent.note.text = "";
      $window.location.href = "/#!/";
    };
  }
]);
