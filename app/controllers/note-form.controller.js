"use strict";

angular.module("snnotebook").controller("noteFormController", [
  "$scope",
  "$window",
  function noteFormController($scope, $window) {
    $scope.query = $scope.$parent.note.text || "";
    $scope.hideDeleteBtn = $scope.$parent.note.id === null ? true : false;
    $scope.date = new Date();
    $scope.isOpen = false;
    $scope.blueIcon = $scope.$parent.note.blueIcon;

    $scope.addNote = function addNote(text, date, blueIcon) {
      if (text !== undefined) {
        $scope.$parent.addNote(text, date, blueIcon);
        $scope.query = "";
        $scope.blueIcon = false;
        $window.location.href = "/#!/";
      }
    };
    $scope.deleteBtn = function deleteBtn($event) {
      $scope.$parent.showConfirm($event, $scope.$parent.note.id);
    };
    $scope.backBtn = function backBtn() {
      $scope.$parent.note.text = "";
      $scope.$parent.note.id = null;
      $scope.$parent.note.blueIcon = false;
      $window.location.href = "/#!/";
    };
  }
]);
