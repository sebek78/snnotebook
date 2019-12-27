"use strict";

angular.module("deleteWarning", []).component("deleteWarning", {
  templateUrl: "delete-warning.template.html",
  controller: [
    "$scope",
    function deleteWarningController($scope) {
      const self = this;
      self.cancelBtn = function cancelBtn() {
        $scope.$parent.$ctrl.deleteNote();
      };
      self.deleteBtn = function deleteBtn() {
        $scope.$parent.$ctrl.deleteNote($scope.$parent.$ctrl.deleteID);
      };
    }
  ]
});
