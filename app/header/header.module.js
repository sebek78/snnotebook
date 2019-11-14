'use strict'

import angular from 'angular';
import headerTemplate from "./header.template.html";
import "./header.css";

export default angular.module("header", []).component("header", {
    template: headerTemplate,
    controller: [
        "$scope",
        "$location",
        function headerController($scope, $location) {
            const self = this;

            self.addNoteBtn = function addNoteBtn() {
                $scope.$parent.setView("showForm");
                $location.path("/");
            };
        }
    ]
});
