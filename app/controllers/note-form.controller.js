"use strict";

angular.module("snnotebook").controller("noteFormController", [
  "$scope",
  "$window",
  function noteFormController($scope, $window) {
    const { text, id, blueIcon, date } = $scope.$parent.note;

    $scope.today = new Date().toISOString().slice(0, 10);
    $scope.noteDate = date !== null ? date.slice(0, 10) : $scope.today;
    $scope.query = text || "";
    $scope.hideDeleteBtn = id === null ? true : false;
    $scope.isOpen = false;
    $scope.blueIcon = blueIcon;
    $scope.changeDate = "no";
    $scope.differentDate = $scope.today !== $scope.noteDate ? true : false;

    $scope.addNote = function addNote(text, date, blueIcon) {
      if (typeof date === "object") date = date.toISOString().slice(0, 10);
      if (text) {
        if ($scope.changeDate === "yes") date = $scope.today;
        $scope.$parent.addNote(text, date, blueIcon);
        $scope.query = "";
        $scope.blueIcon = false;
        $window.location.href = "/#!/";
      }
    };
    $scope.deleteBtn = function deleteBtn($event) {
      $scope.$parent.showConfirm($event, id);
    };
    $scope.backBtn = function backBtn() {
      $scope.$parent.note.text = "";
      $scope.$parent.note.id = null;
      $scope.$parent.note.blueIcon = false;
      $window.location.href = "/#!/";
    };
  }
]);
