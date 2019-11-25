'use strict';
import angular from 'angular';
import deleteWarningTemplate from './delete-warning.template.html';

export default angular.module("deleteWarning", []).component("deleteWarning", {
    template: deleteWarningTemplate,
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
]});